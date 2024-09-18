from fastapi import APIRouter

from routes import health,product,customer

api_route = APIRouter()
api_route.include_router(health.health, prefix="/health", tags=[health])

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app=api_route, host='localhost',port=8080)
