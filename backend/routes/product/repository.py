from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from . import model, schemas
from config.database import db

def getAllProduct():
    product = db.query(model.Product).all()
    return product

def getLastProductID():
    lastID = db.query(model.Product).order_by(model.Product.product_id.desc()).first()
    return lastID.product_id

def addProduct(db_product: model.Product):
    try:
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
    except SQLAlchemyError as e:
        db.rollback()  # Rollback the transaction in case of error
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error adding product") from e
