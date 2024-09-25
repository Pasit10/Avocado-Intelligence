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

def __getNextCustomerID():
    customer = db.query(model.Customer).order_by(model.Customer.customer_id.desc()).first()
    if not customer:
        return 1
    return customer.customer_id + 1

def addCustomer(request_create:schemas.CustomerCreate):
    db_customer = model.Customer(
        customer_id=__getNextCustomerID(),
        sex=request_create.sex,
        age=request_create.age,
        race=request_create.race
    )

    try:
        db.add(db_customer)
        db.commit()
        db.refresh(db_customer)
    except SQLAlchemyError as e:
        db.rollback()  # Rollback the transaction in case of error
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error adding product") from e
