from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware

from config import database
from routes.customer import customer
from routes.product import product
from routes.transaction import transaction
from routes import health

app = FastAPI()

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

app.include_router(api_route)

# close database
@api_route.on_event("shutdown")
def shutdown_db_section():
    database.shutdown_db_section()

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app=app, host='localhost',port=8080)
