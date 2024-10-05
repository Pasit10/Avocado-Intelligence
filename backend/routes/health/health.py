
from fastapi import APIRouter, HTTPException, status

health = APIRouter()

@health.get("/gethealth", status_code=status.HTTP_200_OK)
def get_health():
    return {
        "code": status.HTTP_200_OK,
        "message": "HelloWorld",
    }
