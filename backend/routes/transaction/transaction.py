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
    transactions = repository.getTransactionLast5DayByProductID(product_id)
    if not transactions:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transactions not found")

    total_qty = 0
    dates = []
    group_data = {
        "sex": [],
        "age": [],
        "race": [],
    }
    series_data = {
        "sex": [],
        "age": [],
        "race": [],
    }

    # Loop through transactions
    for transaction in transactions:
        total_qty += transaction.qty

        # Add transaction date to dates if not already present
        transaction_date = transaction.transaction_date.strftime('%Y-%m-%d')
        if transaction_date not in dates:
            dates.append(transaction_date)

            # Initialize series counts for new date
            series_data["sex"].append([0] * len(group_data["sex"]))
            series_data["age"].append([0] * len(group_data["age"]))
            series_data["race"].append([0] * len(group_data["race"]))

        # Fetch customer details
        customer = repository.findCustomerByID(transaction.customer_id)

        # Add customer sex, age, race to group if not already present
        if customer.sex not in group_data["sex"]:
            group_data["sex"].append(customer.sex)
            # Extend all previous series lists with a new entry for this sex
            for s in series_data["sex"]:
                s.append(0)

        if str(customer.age) not in group_data["age"]:
            group_data["age"].append(str(customer.age))  # Convert age to string to match group type
            # Extend all previous series lists with a new entry for this age
            for a in series_data["age"]:
                a.append(0)

        if customer.race not in group_data["race"]:
            group_data["race"].append(customer.race)
            # Extend all previous series lists with a new entry for this race
            for r in series_data["race"]:
                r.append(0)

        # Find the index of the transaction date
        date_index = dates.index(transaction_date)

        # Increment the counts for series data based on customer info
        sex_index = group_data["sex"].index(customer.sex)
        age_index = group_data["age"].index(str(customer.age))
        race_index = group_data["race"].index(customer.race)

        series_data["sex"][date_index][sex_index] += 1
        series_data["age"][date_index][age_index] += 1
        series_data["race"][date_index][race_index] += 1

    # Prepare the response in the format matching the schema
    response = {
        "product": {
            "product_id": product.product_id,
            "product_img": product.product_img,  # Assuming image is bytes and needs no further processing
            "name": product.name,
            "price": product.price,
            "detail": product.detail,
            "total_qty": total_qty
        },
        "dates": dates,
        "group": group_data,
        "series": series_data,
    }

    return response