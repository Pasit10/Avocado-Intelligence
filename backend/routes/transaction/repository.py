from fastapi import HTTPException, status
from sqlalchemy import func, case
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime,timedelta

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


def getTransactionByID(customer_id:int):
    transaction = db.query(Transaction).filter(Transaction.customer_id == customer_id)
    return transaction.all()

def getTransactionLast7DayByProductID(product_id: int):
    current_date = datetime.today()
    start_of_week = current_date - timedelta(days=7)
    total_qty = (
        db.query(func.sum(Transaction.qty))
        .filter(Transaction.product_id == product_id)
        .filter(Transaction.transaction_date.between(start_of_week,current_date))
    ).scalar()

    sex_data = (
        db.query(Transaction.transaction_date, Customer.sex, func.count(func.distinct(Customer.customer_id)))
        .join(Transaction, Transaction.customer_id == Customer.customer_id)
        .filter(Transaction.product_id == product_id)
        .filter(Transaction.transaction_date.between(start_of_week,current_date))
        .group_by(Customer.sex, Transaction.transaction_date)
        .order_by(Transaction.transaction_date.desc())
    )

    age_data = (
        db.query(Transaction.transaction_date,case(
            (Customer.age < 18, 'Under 18'),
            (Customer.age.between(18, 25), '18-25'),
            (Customer.age.between(26, 35), '26-35'),
            (Customer.age.between(36, 45), '36-45'),
            (Customer.age.between(46, 55), '46-55'),
            (Customer.age.between(56, 65), '56-65'),
            (Customer.age > 65, 'Over 65'),
            else_='Unknown'
        ).label("age_group"),func.count(Customer.customer_id).label("count"))
        .join(Transaction, Transaction.customer_id == Customer.customer_id)
        .filter(Transaction.product_id == product_id)
        .filter(Transaction.transaction_date.between(start_of_week,current_date))
        .group_by("age_group",Transaction.transaction_date)
        .order_by(Transaction.transaction_date.desc())
    )

    race_data = (
        db.query(Transaction.transaction_date, Customer.race, func.count(func.distinct(Customer.customer_id)))
        .join(Transaction, Transaction.customer_id == Customer.customer_id)
        .filter(Transaction.product_id == product_id)
        .filter(Transaction.transaction_date.between(start_of_week,current_date))
        .group_by(Customer.race, Transaction.transaction_date)
        .order_by(Transaction.transaction_date.desc())
    )
    return total_qty, sex_data, age_data, race_data