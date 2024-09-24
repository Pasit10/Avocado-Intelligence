from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from . import model, schemas
from config.database import db

def getAllCustomer():
    customer_all = db.query(model.Customer).all()
    return customer_all

def getCustomerByID(customer_id:int):
    customer = db.query(model.Customer).filter(model.Customer.customer_id == customer_id).first()
    return customer