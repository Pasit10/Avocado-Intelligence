from fastapi import APIRouter

from config import database
from routes.customer import customer
from routes.product import product
from routes.transaction import transaction
from routes import health

api_route = APIRouter()
api_route.include_router(health.health, prefix="/health", tags=[health])
api_route.include_router(customer.customer, prefix="/customer", tags=[customer])
api_route.include_router(product.product, prefix="/product", tags=[product])
api_route.include_router(transaction.transaction, prefix="transaction", tags=[transaction])

# close database
@api_route.on_event("shutdown")
def shutdown_db_section():
    database.shutdown_db_section()

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app=api_route, host='localhost',port=8080)
