from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import logging

from app.agents.prompts import (
    PLANNER_SYSTEM_PROMPT,
    ARCHITECT_SYSTEM_PROMPT,
    CODER_SYSTEM_PROMPT,
    REVIEWER_SYSTEM_PROMPT
)
from app.agents.ollama_client import call_agent, extract_json
from app.services.workspace_manager import (
    init_project,
    save_stage_data,
    write_project_file,
    create_project_zip
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="DevForge Backend API")

os.makedirs("workspace", exist_ok=True)
app.mount("/projects", StaticFiles(directory="workspace"), name="projects")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PlanRequest(BaseModel):
    user_prompt: str
    tech_stack_override: Optional[str] = None

class ArchitectRequest(BaseModel):
    project_plan: Dict[str, Any]

class CoderRequest(BaseModel):
    project_name: str
    tech_stack: Dict[str, str]
    file: Dict[str, Any]
    architect_notes: str
    previously_generated_files: List[Dict[str, str]]

class ReviewerRequest(BaseModel):
    project_plan: Dict[str, Any]
    architecture: Dict[str, Any]
    generated_files: List[Dict[str, str]]

@app.post("/api/plan")
async def plan_project(request: PlanRequest):
    user_msg = request.user_prompt
    if request.tech_stack_override:
        user_msg += f"\nTech stack requested: {request.tech_stack_override}"
    
    response_text = await call_agent("deepseek-r1:14b", PLANNER_SYSTEM_PROMPT, user_msg, temperature=0.3)
    try:
        plan_json = extract_json(response_text)
        project_name = plan_json.get("project_name", "new-project")
        init_project(project_name)
        save_stage_data(project_name, "plan", plan_json)
        return plan_json
    except Exception as e:
        logger.error(f"Failed to generate plan: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/architect")
async def architect_project(request: ArchitectRequest):
    user_msg = f"Project Plan:\n{request.project_plan}\nGenerate the complete file-level architecture for this project."
    response_text = await call_agent("deepseek-coder-v2:16b", ARCHITECT_SYSTEM_PROMPT, user_msg, temperature=0.1)
    try:
        arch_json = extract_json(response_text)
        project_name = request.project_plan.get("project_name", "new-project")
        save_stage_data(project_name, "architecture", arch_json)
        
        for cf in arch_json.get("config_files", []):
            write_project_file(project_name, cf["path"], cf["content"])
        if arch_json.get("docker_compose") and arch_json["docker_compose"] != "null":
            write_project_file(project_name, "docker-compose.yml", str(arch_json["docker_compose"]))
        return arch_json
    except Exception as e:
        logger.error(f"Failed to generate architecture: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/code")
async def generate_code(request: CoderRequest):
    file_info = request.file
    previously_generated = "\n".join([f"{f.get('path', 'unknown')}: code length {len(f.get('content', ''))}" for f in request.previously_generated_files])
    
    user_msg = f"""Project: {request.project_name}
Tech Stack: {request.tech_stack}
File to generate: {file_info.get('path')}
File purpose: {file_info.get('description')}
Task: {file_info.get('task')}
Dependencies: {file_info.get('depends_on', [])}
Boilerplate style: {file_info.get('boilerplate_style')}

Cross-file consistency notes:
{request.architect_notes}

Previously generated files (for context):
{previously_generated}

Generate the complete contents of {file_info.get('path')} now."""

    response_text = await call_agent("qwen2.5-coder:14b", CODER_SYSTEM_PROMPT, user_msg, temperature=0.2)
    content = response_text.strip()
    if content.startswith("```"):
        lines = content.split("\n")
        if lines[-1].startswith("```"):
            content = "\n".join(lines[1:-1])
        else:
            content = "\n".join(lines[1:])
        
    write_project_file(request.project_name, file_info.get("path"), content)
    return {"path": file_info.get("path"), "content": content}

@app.post("/api/review")
async def review_project(request: ReviewerRequest):
    files_str = "\n".join([f"=== {f['path']} ===\n{f['content']}\n" for f in request.generated_files])
    user_msg = f"""Review the following project:

Project Plan:
{request.project_plan}

Architecture:
{request.architecture}

Generated Files:
{files_str}

Produce a complete review report, test stubs, README, and docker run command."""

    response_text = await call_agent("qwen2.5-coder:14b", REVIEWER_SYSTEM_PROMPT, user_msg, temperature=0.1)
    try:
        review_json = extract_json(response_text)
        project_name = request.project_plan.get("project_name", "new-project")
        save_stage_data(project_name, "review", review_json)
        
        for test in review_json.get("test_stubs", []):
            write_project_file(project_name, test["file"], test["content"])
        
        if review_json.get("readme_content"):
            write_project_file(project_name, "README.md", review_json["readme_content"])
            
        return review_json
    except Exception as e:
        logger.error(f"Failed to review project: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/package/{project_name}")
async def package_project(project_name: str):
    try:
        zip_path = create_project_zip(project_name)
        return FileResponse(zip_path, filename=f"{project_name}.zip", media_type='application/zip')
    except Exception as e:
        logger.error(f"Failed to package project: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
