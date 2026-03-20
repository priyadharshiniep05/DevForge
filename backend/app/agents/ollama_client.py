import httpx
import json
import logging

logger = logging.getLogger(__name__)

async def call_agent(model: str, system_prompt: str, user_message: str, temperature: float = 0.2) -> str:
    """Invokes the Ollama local API and returns the generated text."""
    try:
        async with httpx.AsyncClient(timeout=300.0) as client:
            response = await client.post(
                "http://localhost:11434/api/generate",
                json={
                    "model": model,
                    "system": system_prompt,
                    "prompt": user_message,
                    "stream": False,
                    "options": {
                        "temperature": temperature,
                        "num_ctx": 8192,
                        "num_predict": 4096
                    }
                }
            )
            try:
                response.raise_for_status()
            except httpx.HTTPStatusError as e:
                error_data = e.response.json() if e.response.text else {}
                error_msg = error_data.get("error", f"Status {e.response.status_code}")
                raise ValueError(f"Ollama Error: {error_msg}")
                
            data = response.json()
            return data.get("response", "")
    except ValueError as ve:
        logger.error(f"Ollama validation error ({model}): {str(ve)}")
        raise ve
    except Exception as e:
        logger.error(f"Error calling Ollama agent ({model}): {str(e)}")
        raise e

import json_repair

def extract_json(response: str) -> dict:
    """Extracts JSON from an LLM response assuming it might be wrapped in markdown fences."""
    start_idx = response.find("```json")
    if start_idx != -1:
        start_idx += 7
        end_idx = response.find("```", start_idx)
        if end_idx != -1:
            json_str = response[start_idx:end_idx].strip()
        else:
            json_str = response[start_idx:].strip()
    else:
        json_str = response.strip()
        if json_str.startswith("```"):
            json_str = json_str.split("```")[1].strip()

    first_brace = json_str.find('{')
    last_brace = json_str.rfind('}')
    if first_brace != -1:
        json_str = json_str[first_brace:last_brace+1] if last_brace != -1 else json_str[first_brace:]
        
    try:
        return json_repair.loads(json_str)
    except Exception as e:
        logger.error(f"Failed to parse JSON: {json_str[:100]}... Error: {str(e)}")
        raise ValueError("Invalid JSON output from agent")
