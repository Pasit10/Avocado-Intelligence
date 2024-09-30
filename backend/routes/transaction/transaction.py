from fastapi import APIRouter, HTTPException, status
from datetime import date

from . import schemas, repository

transaction = APIRouter()

@transaction.post(path="/addtransaction",status_code=status.HTTP_201_CREATED)
def addTransaction(transaction_request:schemas.TransactionRequest):
    if transaction_request.customer_id <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="customer_id less than zero")

    customer = repository.findCustomerByID(transaction_request.customer_id)
    if not customer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="customer not found")

    for product in transaction_request.product_list:
        if product.product_id < 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail=f"product_id {product.product_id} less than zero")

        load_product = repository.findProductByID(product.product_id)
        if not load_product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"product {product.product_id} not found")

        create_transaction = schemas.TransactionCreate(
            customer_id=transaction_request.customer_id,
            product_id=product.product_id,
            qty=product.qty,
            transaction_date=date.today()
        )
        repository.addTransaction(create_transaction)

    return {
        "code": status.HTTP_201_CREATED,
        "message": "transaction add in database",
    }