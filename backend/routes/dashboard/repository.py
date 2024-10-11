from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import func, case
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

from config.database import db
from model.customer import Customer
from model.product import Product
from model.transaction import Transaction

def getCustomerData(datetype:str):
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

def getCustomerDataForSatatistic():
    total_customer = db.query(func.count(Customer.customer_id)).scalar()
    sex_data = (
        db.query(Customer.sex, func.count(Customer.sex))
        .group_by(Customer.sex)
        .all()
    )
    age_data = (
        db.query(
            case(
                (Customer.age < 18, 'Under 18'),
                (Customer.age.between(18, 25), '18-25'),
                (Customer.age.between(26, 35), '26-35'),
                (Customer.age.between(36, 45), '36-45'),
                (Customer.age.between(46, 55), '46-55'),
                (Customer.age.between(56, 65), '56-65'),
                (Customer.age > 65, 'Over 65'),
                else_='Unknown'
                ).label("age_group"),
                func.count(Customer.customer_id).label("count")
        )
        .group_by("age_group")
        .all()
    )
    race_data = (
        db.query(Customer.race, func.count(Customer.race))
        .group_by(Customer.race)
        .all()
    )
    return total_customer, sex_data, age_data, race_data

def getTopProduct(datetype:str, limit:int):
    current_date = datetime.today()
    current_date_str = current_date.strftime("%y-%m-%d")

    if datetype == "day":
        product_data = (
            db.query(Product.name, func.sum(Transaction.qty))
            .join(Transaction, Transaction.product_id == Product.product_id)
            .filter(Transaction.transaction_date == current_date_str)
            .group_by(Product.product_id)
            .limit(limit)
        )
        return product_data

    one_week_ago = (current_date - relativedelta(days=6)).strftime("%y-%m-%d")
    one_mouth_ago = (current_date - relativedelta(months=1)).strftime("%y-%m-%d")

    start_date = one_week_ago if datetype == "week" else one_mouth_ago

    product_data = (
        db.query(Product.name, func.count(Transaction.qty))
        .join(Transaction, Transaction.product_id == Product.product_id)
        .filter(Transaction.transaction_date.between(start_date,current_date_str))
        .group_by(Product.product_id)
        .limit(limit)
    )
    return product_data

def getBestSellerProduct():
    product = (
        db.query(Product)
        .join()
    )