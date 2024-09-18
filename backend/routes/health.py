
from fastapi import APIRouter, HTTPException, status

health = APIRouter()

count = 0

@health.get("/gethealth", status_code=status.HTTP_200_OK)
def get_health():
    return {
        "code": status.HTTP_200_OK,
        "message": "HelloWorld",
    }
