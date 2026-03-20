import os
import json
import zipfile
import tempfile
import time
from typing import Dict, Any, List

WORKSPACE_DIR = os.path.join(os.getcwd(), "workspace")

def get_project_dir(project_name: str) -> str:
    return os.path.join(WORKSPACE_DIR, project_name)

def init_project(project_name: str):
    """Creates the project directory and .devforge metadata folder."""
    project_dir = get_project_dir(project_name)
    devforge_dir = os.path.join(project_dir, ".devforge")
    os.makedirs(devforge_dir, exist_ok=True)
    return project_dir

def save_stage_data(project_name: str, stage: str, data: Any):
    """Saves metadata for a specific stage (plan.json, architecture.json, review.json)."""
    devforge_dir = os.path.join(get_project_dir(project_name), ".devforge")
    file_path = os.path.join(devforge_dir, f"{stage}.json")
    with open(file_path, "w") as f:
        json.dump(data, f, indent=2)

def write_project_file(project_name: str, file_path: str, content: str):
    """Writes a generated code file to the project workspace."""
    full_path = os.path.join(get_project_dir(project_name), file_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w") as f:
        f.write(content)

def create_project_zip(project_name: str) -> str:
    """Creates a zip archive of the project and returns the zip file path."""
    project_dir = get_project_dir(project_name)
    zip_filename = f"{project_name}_export_{int(time.time())}.zip"
    zip_path = os.path.join(tempfile.gettempdir(), zip_filename)
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(project_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, project_dir)
                zipf.write(file_path, arcname)
    return zip_path
