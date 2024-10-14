from fastapi import APIRouter, HTTPException, Query, status, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, extract
from datetime import datetime, timedelta

from config.async_database import get_db
from . import schemas, repository

dashboard = APIRouter()

@dashboard.get(path="/getcustomer", status_code=status.HTTP_200_OK)
async def getCustomerData(datetype: str, db: AsyncSession = Depends(get_db)):
    if datetype not in ["day", "week", "month"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid datatype value. Allowed values: day, week, month")

    sex_data, age_data, race_data = await repository.getCustomerData(datetype,db)
    response_dict = {}

    if not sex_data or not age_data or not race_data:
        response = {
            "transaction_date": datetime.today().strftime('%Y-%m-%d'),
            "sex": {},
            "age": {},
            "race": {},
        }
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={
                "detail": f"No data available for this {datetype}",
                "data": response
            }
        )

    for transaction_date, sex, count in sex_data:
        date_str = transaction_date.strftime('%Y-%m-%d')
        if date_str not in response_dict:
            response_dict[date_str] = {
                "transaction_date": date_str,
                "sex": {},
                "age": {},
                "race": {}
            }
        if sex not in response_dict[date_str]["sex"]:
            response_dict[date_str]["sex"][sex] = 0
        response_dict[date_str]["sex"][sex] += int(count)

    for transaction_date, avg_age in age_data:
        date_str = transaction_date.strftime('%Y-%m-%d')
        if date_str not in response_dict:
            response_dict[date_str] = {
                "transaction_date": date_str,
                "sex": {},
                "age": {},
                "race": {}
            }

        response_dict[date_str]["age"]["avg"] = float(avg_age)

    for transaction_date, race, count in race_data:
        date_str = transaction_date.strftime('%Y-%m-%d')
        if date_str not in response_dict:
            response_dict[date_str] = {
                "transaction_date": date_str,
                "sex": {},
                "age": {},
                "race": {}
            }

        if race not in response_dict[date_str]["race"]:
            response_dict[date_str]["race"][race] = 0
        response_dict[date_str]["race"][race] += int(count)

    response_list = list(response_dict.values())

    return JSONResponse(content=response_list)

def __calculate_percentage(count, total):
    return f"{(count / total) * 100:.0f}%" if total != 0 else "0%"

@dashboard.get(path="/getcustomerstatistic",status_code=status.HTTP_200_OK)
async def getCustomerStatistic(db: AsyncSession = Depends(get_db)):
    total_customer, sex_data, age_data, race_data = await repository.getCustomerDataForStatistic(db)

    response = {
        "sex": {
            "male": __calculate_percentage(next((count for group, count in sex_data if group == "male"), 0), total_customer),
            "female": __calculate_percentage(next((count for group, count in sex_data if group == "female"), 0), total_customer)
        },
        "age": {
            "under 18": __calculate_percentage(next((count for group, count in age_data if group == "Under 18"), 0), total_customer),
            "18 - 25": __calculate_percentage(next((count for group, count in age_data if group == "18-25"), 0), total_customer),
            "26 - 35": __calculate_percentage(next((count for group, count in age_data if group == "26-35"), 0), total_customer),
            "46 - 55": __calculate_percentage(next((count for group, count in age_data if group == "46-55"), 0), total_customer),
            "56 - 65": __calculate_percentage(next((count for group, count in age_data if group == "56-65"), 0), total_customer),
            "over 65": __calculate_percentage(next((count for group, count in age_data if group == "Over 65"), 0), total_customer)
        },
        "race": {
            "White": __calculate_percentage(next((count for race, count in race_data if race == "White"), 0), total_customer),
            "Black": __calculate_percentage(next((count for race, count in race_data if race == "Black"), 0), total_customer),
            "Asian": __calculate_percentage(next((count for race, count in race_data if race == "Asian"), 0), total_customer),
            "Indian": __calculate_percentage(next((count for race, count in race_data if race == "Indian"), 0), total_customer),
            "Others": __calculate_percentage(next((count for race, count in race_data if race == "Others"), 0), total_customer)
        }
    }
    return response

@dashboard.get(path="/gettopproduct", status_code=status.HTTP_200_OK)
async def getTopProduct(datetype: str, limit: int, db: AsyncSession = Depends(get_db)):
    if datetype not in ["day", "week", "month"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid datatype value. Allowed values: day, week, month")

    if not isinstance(limit, int):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid datatype value. Allowed only integer")

    product_data = await repository.getTopProduct(datetype, limit, db)

    response = []
    for product in product_data:
        product_dict = {
            "name": product[0],       # Accessing the product name
            "total_qty": product[1]   # Accessing the total quantity
        }
        response.append(product_dict)

    return response

@dashboard.get(path="/getbestsellerproduct",status_code=status.HTTP_200_OK)
async def getBestSellerProduct(db: AsyncSession = Depends(get_db)):
    product = await repository.getBestSellerProduct(db)
    if not product:
        return HTTPException(status_code=status.HTTP_204_NO_CONTENT,detail="No product found")

    response = {
                    "product_id": product.Product.product_id,
                    "name": product.Product.name,
                    "description": product.Product.detail,
                    "price": product.Product.price,
                    "product_img": product.Product.product_img,
                    "total_qty": product.total_qty
                }
    return response