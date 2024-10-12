from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.future import select
from sqlalchemy import func, case
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

from config.async_database import db
from model.customer import Customer
from model.product import Product
from model.transaction import Transaction

async def getCustomerData(datetype: str):
    current_date = datetime.today()
    current_date_str = current_date.strftime("%y-%m-%d")

    if datetype == "day":
        sex_data_stmt = (
            select(Transaction.transaction_date, Customer.sex, func.count(func.distinct(Customer.customer_id)))
            .join(Transaction, Transaction.customer_id == Customer.customer_id)
            .filter(Transaction.transaction_date == current_date_str)
            .group_by(Customer.sex, Transaction.transaction_date)
            .order_by(Transaction.transaction_date)
        )
        age_data_stmt = (
            select(Transaction.transaction_date, func.avg(Customer.age))
            .join(Transaction, Transaction.customer_id == Customer.customer_id)
            .filter(Transaction.transaction_date == current_date_str)
            .group_by(Transaction.transaction_date)
            .order_by(Transaction.transaction_date)
        )
        race_data_stmt = (
            select(Transaction.transaction_date, Customer.race, func.count(func.distinct(Customer.customer_id)))
            .join(Transaction, Transaction.customer_id == Customer.customer_id)
            .filter(Transaction.transaction_date == current_date_str)
            .group_by(Customer.race, Transaction.transaction_date)
            .order_by(Transaction.transaction_date)
        )

        sex_data = await db.execute(sex_data_stmt)
        age_data = await db.execute(age_data_stmt)
        race_data = await db.execute(race_data_stmt)

        return sex_data.all(), age_data.all(), race_data.all()

    # Calculate date ranges for "week" and "month"
    one_week_ago = (current_date - relativedelta(days=6)).strftime("%y-%m-%d")
    one_month_ago = (current_date - relativedelta(months=1)).strftime("%y-%m-%d")
    start_date = one_week_ago if datetype == "week" else one_month_ago

    # Query for sex data
    sex_data_stmt = (
        select(Transaction.transaction_date, Customer.sex, func.count(func.distinct(Customer.customer_id)))
        .join(Transaction, Transaction.customer_id == Customer.customer_id)
        .filter(Transaction.transaction_date.between(start_date, current_date_str))
        .group_by(Customer.sex, Transaction.transaction_date)
        .order_by(Transaction.transaction_date)
    )
    age_data_stmt = (
        select(Transaction.transaction_date, func.avg(Customer.age))
        .join(Transaction, Transaction.customer_id == Customer.customer_id)
        .filter(Transaction.transaction_date.between(start_date, current_date_str))
        .group_by(Transaction.transaction_date)
        .order_by(Transaction.transaction_date)
    )
    race_data_stmt = (
        select(Transaction.transaction_date, Customer.race, func.count(func.distinct(Customer.customer_id)))
        .join(Transaction, Transaction.customer_id == Customer.customer_id)
        .filter(Transaction.transaction_date.between(start_date, current_date_str))
        .group_by(Customer.race, Transaction.transaction_date)
        .order_by(Transaction.transaction_date)
    )

    sex_data = await db.execute(sex_data_stmt)
    age_data = await db.execute(age_data_stmt)
    race_data = await db.execute(race_data_stmt)

    return sex_data.all(), age_data.all(), race_data.all()

async def getCustomerDataForStatistic():
    # Total customer count
    total_customer_stmt = select(func.count(Customer.customer_id))
    total_customer_result = await db.execute(total_customer_stmt)
    total_customer = total_customer_result.scalar()

    # Sex data
    sex_data_stmt = (
        select(Customer.sex, func.count(Customer.sex))
        .group_by(Customer.sex)
    )
    sex_data_result = await db.execute(sex_data_stmt)
    sex_data = sex_data_result.all()

    # Age data
    age_data_stmt = (
        select(
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
    )
    age_data_result = await db.execute(age_data_stmt)
    age_data = age_data_result.all()

    # Race data
    race_data_stmt = (
        select(Customer.race, func.count(Customer.race))
        .group_by(Customer.race)
    )
    race_data_result = await db.execute(race_data_stmt)
    race_data = race_data_result.all()

    return total_customer, sex_data, age_data, race_data

async def getTopProduct(datetype: str, limit: int):
    current_date = datetime.today()
    current_date_str = current_date.strftime("%Y-%m-%d")  # Corrected format

    # Query for the "day" datetype
    if datetype == "day":
        stmt = (
            select(Product.name, func.sum(Transaction.qty).label("total_qty"))
            .join(Transaction, Transaction.product_id == Product.product_id)
            .filter(Transaction.transaction_date == current_date_str)
            .group_by(Product.product_id)
            .limit(limit)
        )
        result = await db.execute(stmt)
        product_data = result.all()

        # Access product data as a list of tuples (product name, total_qty)
        return [(row[0], row[1]) for row in product_data]

    # Query for "week" or "month"
    one_week_ago = (current_date - relativedelta(days=6)).strftime("%Y-%m-%d")
    one_month_ago = (current_date - relativedelta(months=1)).strftime("%Y-%m-%d")

    start_date = one_week_ago if datetype == "week" else one_month_ago

    stmt = (
        select(Product.name, func.sum(Transaction.qty).label("total_qty"))
        .join(Transaction, Transaction.product_id == Product.product_id)
        .filter(Transaction.transaction_date.between(start_date, current_date_str))
        .group_by(Product.product_id)
        .order_by(func.sum(Transaction.qty).desc())
        .limit(limit)
    )
    result = await db.execute(stmt)
    product_data = result.all()

    # Access product data as a list of tuples (product name, total_qty)
    return [(row[0], row[1]) for row in product_data]

async def getBestSellerProduct():
    stmt = (
        select(Product, func.sum(Transaction.qty).label("total_qty"))
        .join(Transaction, Product.product_id == Transaction.product_id)
        .group_by(Product.product_id)
        .order_by(func.sum(Transaction.qty).desc())
        .limit(1)  # Limit to one to get the best seller
    )
    result = await db.execute(stmt)
    best_seller = result.first()
    return best_seller
