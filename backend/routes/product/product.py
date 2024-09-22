from fastapi import APIRouter, Depends, HTTPException, status
from . import repository, model, schemas

product = APIRouter()

# basic path (create read update delete)
@product.get(path="/getproduct")
def get_product():
    product = repository.getAllProduct()
    return product

@product.get(path="/getproduct/{product_id}",status_code=status.HTTP_200_OK)
def get_product_byID(product_id:int):
    if product_id < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='product_id less than zero')

    product = repository.getProductByID(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='product not found')
    return product

@product.post(path="/addproduct",status_code=status.HTTP_201_CREATED)
def add_product(request_product: schemas.ProductCreate):
    #check request
    if request_product.name == '':
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='name is empty')
    elif request_product.price <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='price less than zero')
    elif len(request_product.detail) > 255:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='detail to long')

    repository.addProduct(request_product)
    return {
        "code": status.HTTP_201_CREATED,
        "message": "product add in database",
    }

@product.put(path="/updateproduct",status_code=status.HTTP_200_OK)
def update_product():
    pass

@product.delete(path="/deleteproduct/{product_id}",status_code=status.HTTP_200_OK)
def delete_product(product_id:int):
    if product_id < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='product_id less than zero')
    product = repository.findProductByID(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='product not found')

    repository.deleteProduct(product)
    return status.HTTP_200_OK