from fastapi import HTTPException, status
from sqlalchemy import or_
from sqlalchemy.exc import SQLAlchemyError

from . import schemas
from config.database import db
from model.product import Product

def getAllProduct():
    product_all = db.query(Product).all()
    return product_all

def getProductByID(product_id:int):
    product = db.query(Product).filter(Product.product_id == product_id).first()
    return product

def getSearchProduct(query:str):
    search_query = f"%{query}%"
    product = db.query(Product).filter(
                or_(
                    Product.product_id.like(search_query),
                    Product.name.like(search_query)
                )
            ).all()
    return product


def __getNextProductID():
    product = db.query(Product).order_by(Product.product_id.desc()).first()
    if not product:
        return 1
    return product.product_id + 1

def addProduct(request_product: schemas.ProductCreate):
    db_product = Product(
        product_id=__getNextProductID(),
        name=request_product.name,
        price=request_product.price,
        detail=request_product.detail,
        product_img=request_product.product_img
    )

    try:
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
    except SQLAlchemyError as e:
        db.rollback()  # Rollback the transaction in case of error
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error adding product") from e

def findProductByID(product_id:int):
    product = db.query(Product).filter(Product.product_id == product_id).first()
    return product

def findProductForUpdateByID(product_id:int):
    product = db.query(Product).filter(Product.product_id == product_id).first()
    return product

def updateProduct(product_id:int, update_request:schemas.ProductUpdate):
    product = findProductForUpdateByID(product_id)

    product.name = update_request.name
    product.detail = update_request.detail
    product.price = update_request.price
    product.product_img = update_request.product_img

    try:
        db.commit()
        db.refresh(product)
    except SQLAlchemyError as e:
        db.rollback()  # Rollback the transaction in case of error
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error to update product") from e

def deleteProduct(product_id:int):
    try:
        db.query(Product).filter(Product.product_id == product_id).delete()
        db.commit()
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error to delete product") from e