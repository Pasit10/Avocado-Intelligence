from fastapi import APIRouter, Depends, HTTPException
from . import repository, model, schemas

product = APIRouter()

# basic path (create read update delete)
@product.get("/getproduct")
def get_product():
    product = repository.getAllProduct()
    return product

@product.post("/addproduct")
def add_product(request_product: schemas.ProductCreate):
    #check request
    request_product