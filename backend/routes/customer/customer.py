from fastapi import APIRouter, HTTPException, status
from typing import List

from . import schemas, repository, processimage

customer = APIRouter()

@customer.get("/getcustomer",status_code=status.HTTP_200_OK,response_model=List[schemas.CustomerResponse])
def getAllCustomer():
    customer = repository.getAllCustomer()
    return customer

@customer.get("/getcustomer/{customer_id}",status_code=status.HTTP_200_OK,response_model=schemas.CustomerResponse)
def getCustomerByID(customer_id:int):
    if customer_id < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='customer_id less than zero')

    customer = repository.getCustomerByID(customer_id)
    if not customer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='customer not found')
    return customer

@customer.post("/addcustomer",status_code=status.HTTP_201_CREATED)
def addCustomer(request_customer: schemas.CustomerRequest):
    if request_customer.customer_img == None or request_customer.customer_img == '':
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='customer image is empty')

    customer_img = processimage.processIMG(request_customer.customer_img)
    result_list = processimage.predict(customer_img)

    request_create = schemas.CustomerCreate(
        sex=result_list[0],
        age=result_list[1],
        race=result_list[2]
    )
    repository.addCustomer(request_create)

    return {
        "code": status.HTTP_201_CREATED,
        "message": "customer add in database",
    }

