from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import func
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

from config.database import db
from model.customer import Customer
from model.product import Product
from model.transaction import Transaction

def getDataCustomerData(datetype:str):
    current_date = datetime.today()
    current_date_str = current_date.strftime("%y-%m-%d")

    if datetype == "day":
        sex_data = (
            db.query(Transaction.transaction_date, Customer.sex, func.count(func.distinct(Customer.customer_id)))
            .join(Transaction, Transaction.customer_id == Customer.customer_id)
            .filter(Transaction.transaction_date == current_date_str)
            .group_by(Customer.sex, Transaction.transaction_date)
            .order_by(Transaction.transaction_date)
            .all()
        )
        age_data = (
            db.query(Transaction.transaction_date,func.avg(Customer.age))
            .join(Transaction, Transaction.customer_id == Customer.customer_id)
            .filter(Transaction.transaction_date == current_date_str)
            .order_by(Transaction.transaction_date)
            .all()
        )
        race_data = (
            db.query(Transaction.transaction_date, Customer.race, func.count(func.distinct(Transaction.customer_id)))
            .join(Transaction, Transaction.customer_id == Customer.customer_id)
            .filter(Transaction.transaction_date == current_date_str)
            .group_by(Customer.race,Transaction.transaction_date)
            .order_by(Transaction.transaction_date)
            .all()
        )
        return sex_data, age_data, race_data

    one_week_ago = (current_date - relativedelta(days=6)).strftime("%y-%m-%d")
    one_mouth_ago = (current_date - relativedelta(months=1)).strftime("%y-%m-%d")

    start_date = one_week_ago if datetype == "week" else one_mouth_ago

    sex_data = (
        db.query(Transaction.transaction_date, Customer.sex, func.count(func.distinct(Customer.customer_id)))
        .join(Transaction, Transaction.customer_id == Customer.customer_id)
        .filter(Transaction.transaction_date.between(start_date,current_date_str))
        .group_by(Customer.sex, Transaction.transaction_date)
        .order_by(Transaction.transaction_date)
    )
    age_data = (
        db.query(Transaction.transaction_date,func.avg(Customer.age))
        .join(Transaction, Transaction.customer_id == Customer.customer_id)
        .filter(Transaction.transaction_date.between(start_date,current_date_str))
        .group_by(Transaction.transaction_date)
        .order_by(Transaction.transaction_date)
        .all()
    )
    race_data = (
        db.query(Transaction.transaction_date, Customer.race, func.count(func.distinct(Customer.customer_id)))
        .join(Transaction, Transaction.customer_id == Customer.customer_id)
        .filter(Transaction.transaction_date.between(start_date,current_date_str))
        .group_by(Customer.race,Transaction.transaction_date)
        .order_by(Transaction.transaction_date)
        .all()
    )
    return sex_data, age_data, race_data