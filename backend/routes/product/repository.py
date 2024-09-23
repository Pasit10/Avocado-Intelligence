from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from . import model, schemas
from config.database import db


def getProductByID(product_id:int):
    product = db.query(model.Product).filter(model.Product.product_id == product_id).first()
    return product

def __getLastProductID():
    product_lastID = db.query(model.Product).order_by(model.Product.product_id.desc()).first().product_id
    return product_lastID

def addProduct(request_product: schemas.ProductCreate):
    db_product = model.Product(
        product_id=__getLastProductID() + 1,
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

async def findProductByID(product_id:int):
    product = db.query(model.Product).filter(model.Product.product_id == product_id).first()
    return product

def findProductForUpdateByID(product_id:int):
    product = db.query(model.Product).filter(model.Product.product_id == product_id).first()
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
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error adding product") from e

def deleteProduct(product:schemas.ProductCreate):
    try:
        db.delete(product)
        db.commit()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error adding product") from e