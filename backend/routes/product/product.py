from fastapi import APIRouter, Depends, HTTPException, status, Depends
from sqlalchemy.orm import Session
from typing import List

from config.database import get_db
from . import repository, schemas

product = APIRouter()

# basic path (create read update delete)
@product.get(path="/getproduct",status_code=status.HTTP_200_OK,response_model=List[schemas.ProductResponse])
def getProduct(db :Session = Depends(get_db)):
    product = repository.getAllProduct(db)
    return product

@product.get(path="/getproduct/{product_id}",status_code=status.HTTP_200_OK,response_model=schemas.ProductResponse)
def getProduct_byID(product_id:int, db :Session = Depends(get_db)):
    if product_id < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='product_id less than zero')

    product = repository.getProductByID(product_id, db)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='product not found')

    return product

@product.get(path="/searchproduct",status_code=status.HTTP_200_OK,response_model=List[schemas.ProductResponse])
def searchProduct(query:str ,db :Session = Depends(get_db)):
    if query == "":
        raise HTTPException(status_code=status.HTTP_200_OK,detail="search parameter is empty")

    product = repository.getSearchProduct(query, db)
    if not product:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT)
    return product

@product.post(path="/addproduct",status_code=status.HTTP_201_CREATED)
def addProduct(request_product: schemas.ProductCreate, db :Session = Depends(get_db)):
    #check request
    if request_product.name == "":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='name is empty')
    elif request_product.price <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='price less than zero')
    elif len(request_product.detail) > 255:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='detail to long')

    repository.addProduct(request_product, db)
    return {
        "code": status.HTTP_201_CREATED,
        "message": "product add in database",
    }

@product.put(path="/updateproduct/{product_id}",status_code=status.HTTP_200_OK)
def updateProduct(product_id:int,update_request:schemas.ProductUpdate, db :Session = Depends(get_db)):
    if product_id < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='product_id less than zero')
    product = repository.findProductForUpdateByID(product_id, db)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='product not found')

    repository.updateProduct(product_id, update_request, db)
    return {
        "code": status.HTTP_200_OK,
        "message": "Update product to database",
    }


@product.delete(path="/deleteproduct/{product_id}",status_code=status.HTTP_200_OK)
def deleteProduct(product_id:int, db :Session = Depends(get_db)):
    if product_id < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='product_id less than zero')
    product = repository.findProductByID(product_id, db)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='product not found')

    repository.deleteProduct(product_id, db)
    return status.HTTP_200_OK