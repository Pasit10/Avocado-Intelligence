from fastapi import APIRouter, Depends, HTTPException, status
from . import repository, model, schemas

product = APIRouter()

# basic path (create read update delete)
@product.get(path="/getproduct")
def get_product():
    product = repository.getAllProduct()
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

    db_product = model.Product(
        product_id=repository.getLastProductID() + 1,
        name=request_product.name,
        price=request_product.price,
        detail=request_product.detail,
        product_img=request_product.product_img
    )
    repository.addProduct(db_product)
    return {
        "code": status.HTTP_201_CREATED,
        "message": "product add in database",
    }

@product.put(path="/updateproduct",status_code=status.HTTP_200_OK)
def update_product():
    pass