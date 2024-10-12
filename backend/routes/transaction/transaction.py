from fastapi import APIRouter, HTTPException, status
from datetime import date
from typing import List
from decimal import Decimal

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
def deleteTransacrion(customer_id, product_id):
    if customer_id.lower() == 'all':
        product_id = int(product_id)
        if product_id <= 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail=f"product_id less than zero")

        transaction_list = repository.findTransactionByProductId(product_id)
        if len(transaction_list) == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"transaction not found")
        repository.deleteTransactionByProductId(product_id)
    elif product_id.lower() == 'all':
        customer_id = int(customer_id)
        if customer_id <= 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="customer_id less than zero")

        transaction_list = repository.findTransactionByCustomerId(customer_id)
        if len(transaction_list) == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"transaction not found")

        repository.deleteTransactionByCustomerId(customer_id)
    else:
        transaction = repository.findTransactionById(customer_id,product_id)
        if not transaction:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"transaction not found")

        repository.deleteTransaction(customer_id,product_id)
    return status.HTTP_200_OK

@transaction.get(path="/gettransaction/{customer_id}",status_code=status.HTTP_200_OK,response_model=schemas.TransactionResponseByID)
def getTransactionByID(customer_id:int):
    if customer_id < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='customer_id less than zero')

    transactions = repository.getTransactionByID(customer_id)
    if not transactions:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"transaction not found")

    customer = repository.findCustomerByID(customer_id)
    if not customer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"customer not found")

    response_transaction = {
        "customer":customer,
        "product_list":[],
        "transaction_date": transactions[0].transaction_date
    }

    for transaction in transactions:
        product = repository.findProductByID(transaction.product_id)
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"product not found")
        product_res = {
            "product_id":product.product_id,
            "name":product.name,
            "price":product.price,
            "qty":transaction.qty
        }

        response_transaction["product_list"].append(product_res)

    return response_transaction

# deshbord
@transaction.get(path="/getproducttransaction/{product_id}", status_code=status.HTTP_200_OK, response_model=schemas.TransactionProduct)
def get_transaction(product_id: int):
    if product_id < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='product_id less than zero')

    # Fetch product by ID
    product = repository.findProductByID(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    # Fetch transactions for the product
    total_qty, sex_data, age_data, race_data = repository.getTransactionLast7DayByProductID(product_id)

    total_qty = 0 if not total_qty else total_qty

    transaction_data_dict = {}
    for transaction_date, sex, count in sex_data:
        date_str = transaction_date.strftime('%Y-%m-%d')
        if date_str not in transaction_data_dict:
            transaction_data_dict[date_str] = {
                "transaction_date": date_str,
                "sex": {},
                "age": {},
                "race": {}
            }
        if sex not in transaction_data_dict[date_str]["sex"]:
            transaction_data_dict[date_str]["sex"][sex] = 0
        transaction_data_dict[date_str]["sex"][sex] += int(count)

    for transaction_date, age, count in age_data:
        date_str = transaction_date.strftime('%Y-%m-%d')
        if age not in transaction_data_dict[date_str]["age"]:
            transaction_data_dict[date_str]["age"][age] = 0
        transaction_data_dict[date_str]["age"][age] += int(count)

    for transaction_date, race, count in race_data:
        date_str = transaction_date.strftime('%Y-%m-%d')
        if race not in transaction_data_dict[date_str]["race"]:
            transaction_data_dict[date_str]["race"][race] = 0
        transaction_data_dict[date_str]["race"][race] += int(count)

    transaction_data = list(transaction_data_dict.values())
    response = {
        "product": {
            "product_id": product.product_id,
            "product_img": product.product_img,
            "name": product.name,
            "price": product.price,
            "detail": product.detail,
            "total_qty": total_qty
        },
        "transaction_data": transaction_data
    }
    return response