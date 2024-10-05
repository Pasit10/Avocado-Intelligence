from fastapi import APIRouter, HTTPException, status
from datetime import date
from typing import List

from . import schemas, repository

transaction = APIRouter()

@transaction.get(path="/gettransaction",status_code=status.HTTP_200_OK,response_model=List[schemas.TransactionResponse])
def getAllTransaction():
    transactions = repository.getAllTransaction()
    response_transactions = {}

    for transaction in transactions:
        customer_id = transaction.customer_id
        if customer_id not in response_transactions:
            response_transactions[customer_id] = {
                "customer_id": customer_id,
                "product_list": [],
                "transaction_date": transaction.transaction_date
            }

        response_transactions[customer_id]["product_list"].append({
            "product_id": transaction.product_id,
            "qty": transaction.qty
        })

    response = list(response_transactions.values())
    return response

@transaction.post(path="/addtransaction",status_code=status.HTTP_201_CREATED)
def addTransaction(transaction_request:schemas.TransactionRequest):
    if transaction_request.customer_id <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="customer_id less than zero")

    customer = repository.findCustomerByID(transaction_request.customer_id)
    if not customer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="customer not found")

    for product in transaction_request.product_list:
        if product.product_id <= 0:
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

@transaction.delete(path="/deletetransaction",status_code=status.HTTP_200_OK)
def deleteTransacrion(customer_id: int, product_id: int):
    if customer_id <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="customer_id less than zero")
    elif product_id <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail=f"product_id less than zero")

    transaction = repository.findTransactionById(customer_id,product_id)
    if not transaction:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"transaction not found")

    repository.deleteTransaction(transaction)
    return status.HTTP_200_OK