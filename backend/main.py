from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from config import database, async_database
from routes.health import health
from routes.customer import customer
from routes.product import product
from routes.transaction import transaction
from routes.dashboard import dashboard

# if terminate program -> close database
@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    database.shutdown_db_section()
    await async_database.shutdown_db_section()

app = FastAPI(lifespan=lifespan)

#middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify specific origins instead of ""
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_route = APIRouter()
api_route.include_router(health.health, prefix="/health", tags=[health])
api_route.include_router(customer.customer, prefix="/customer", tags=[customer])
api_route.include_router(product.product, prefix="/product", tags=[product])
api_route.include_router(transaction.transaction, prefix="/transaction", tags=[transaction])
api_route.include_router(dashboard.dashboard, prefix="/dashboard", tags=[dashboard])

app.include_router(api_route)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app=app, host='localhost',port=8080)
