from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError

from . import schemas
from config.database import db
from model.customer import Customer
from model.product import Product
from model.transaction import Transaction

def getAllTransaction():
    transaction_all = db.query(Transaction).all()
    return transaction_all

def findCustomerByID(customer_id:int):
    customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()
    return customer

def findProductByID(product_id:int):
    product = db.query(Product).filter(Product.product_id == product_id).first()
    return product

def addTransaction(transaction_request:schemas.TransactionCreate):
    db_transaction = Transaction(
        customer_id = transaction_request.customer_id,
        product_id = transaction_request.product_id,
        qty = transaction_request.qty,
        transaction_date = transaction_request.transaction_date
    )

    try:
        db.add(db_transaction)
        db.commit()
        db.refresh(db_transaction)
    except SQLAlchemyError as e:
        db.rollback()  # Rollback the transaction in case of error
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error adding transaction") from e

def findTransactionById(customer_id: int, product_id: int):
    transaction = db.query(Transaction).filter(Transaction.customer_id == customer_id,Transaction.product_id == product_id).first()
    return transaction

def findTransactionByCustomerId(customer_id:int):
    transaction = db.query(Transaction).filter(Transaction.customer_id == customer_id).all()
    return transaction

def findTransactionByProductId(product_id:int):
    transaction = db.query(Transaction).filter(Transaction.product_id == product_id).all()
    return transaction

def deleteTransactionByCustomerId(customer_id:int):
    try:
        db.query(Transaction).filter(Transaction.customer_id == customer_id).delete(synchronize_session=False)
        db.commit()
    except SQLAlchemyError as e:
        db.rollback()  # Rollback the transaction in case of error
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error to deleting transaction") from e

def deleteTransactionByProductId(product_id:int):
    try:
        db.query(Transaction).filter(Transaction.product_id == product_id).delete()
        db.commit()
    except SQLAlchemyError as e:
        db.rollback()  # Rollback the transaction in case of error
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error to deleting transaction") from e

def deleteTransaction(customer_id:int, product_id:int):
    try:
        db.query(Transaction).filter(Transaction.customer_id == customer_id, Transaction.product_id == product_id).delete()
        db.commit()
    except SQLAlchemyError as e:
        db.rollback()  # Rollback the transaction in case of error
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error to deleting transaction") from e
