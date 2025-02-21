from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uvicorn

# Initialize FastAPI app
app = FastAPI()

# Define request model
class DataRequest(BaseModel):
    data: List[str]

# User details (Replace with your actual details)
USER_ID = "chirag_kalucha"
EMAIL = "chiragkalucha15@gmail.com"
ROLL_NUMBER = "22BAI71136"

@app.post("/bfhl")
def process_data(request: DataRequest):
    try:
        numbers = [item for item in request.data if item.isdigit()]
        alphabets = [item for item in request.data if item.isalpha()]
        highest_alphabet = [max(alphabets, key=str.lower)] if alphabets else []

        response = {
            "is_success": True,
            "user_id": USER_ID,
            "email": EMAIL,
            "roll_number": ROLL_NUMBER,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": highest_alphabet
        }
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/bfhl")
def get_operation_code():
    return {"operation_code": 1}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
