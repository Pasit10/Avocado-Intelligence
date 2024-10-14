from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from . import schemas
from model.customer import Customer

def getAllCustomer(db :Session):
    customer_all = db.query(Customer).all()
    return customer_all

def getCustomerByID(customer_id:int, db :Session):
    customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()
    return customer

def __getNextCustomerID(db :Session):
    customer = db.query(Customer).order_by(Customer.customer_id.desc()).first()
    if not customer:
        return 1
    return customer.customer_id + 1

def addCustomer(request_create:schemas.CustomerCreate, db :Session):
    db_customer = Customer(
        customer_id=__getNextCustomerID(db),
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

    return db_customer.customer_id

def findCustomerByID(customer_id:int, db :Session):
    customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()
    return customer

def deleteCustomer(customer_id:int, db :Session):
    try:
        db.query(Customer).filter(Customer.customer_id == customer_id).delete()
        db.commit()
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error to delete product") from e