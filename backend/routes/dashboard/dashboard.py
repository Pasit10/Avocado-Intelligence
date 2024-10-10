from fastapi import APIRouter, HTTPException, Query, status, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from datetime import datetime, timedelta

from . import schemas, repository

dashboard = APIRouter()

@dashboard.get(path="/getcustomer", status_code=status.HTTP_200_OK)
def getCustomerData(datetype: str):
    if datetype not in ["day", "week", "month"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid datatype value. Allowed values: day, week, month")

    sex_data, age_data, race_data = repository.getCustomerData(datetype)
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

@dashboard.get(path="/getcustomerstatistic",status_code=status.HTTP_200_OK)
def getCustomerStatistic():
    total_customer, sex_data, age_data, race_data = repository.getCustomerDataForSatatistic()

    def calculate_percentage(count, total):
        return f"{(count / total) * 100:.0f}%" if total != 0 else "0%"

    response = {
        "sex": {
            "male": calculate_percentage(next((count for group, count in sex_data if group == "male"), 0), total_customer),
            "female": calculate_percentage(next((count for group, count in sex_data if group == "female"), 0), total_customer)
        },
        "age": {
            "under 18": calculate_percentage(next((count for group, count in age_data if group == "Under 18"), 0), total_customer),
            "18 - 25": calculate_percentage(next((count for group, count in age_data if group == "18-25"), 0), total_customer),
            "26 - 35": calculate_percentage(next((count for group, count in age_data if group == "26-35"), 0), total_customer),
            "46 - 55": calculate_percentage(next((count for group, count in age_data if group == "46-55"), 0), total_customer),
            "56 - 65": calculate_percentage(next((count for group, count in age_data if group == "56-65"), 0), total_customer),
            "over 65": calculate_percentage(next((count for group, count in age_data if group == "Over 65"), 0), total_customer)
        },
        "race": {
            "White": calculate_percentage(next((count for race, count in race_data if race == "White"), 0), total_customer),
            "Black": calculate_percentage(next((count for race, count in race_data if race == "Black"), 0), total_customer),
            "Asian": calculate_percentage(next((count for race, count in race_data if race == "Asian"), 0), total_customer),
            "Indian": calculate_percentage(next((count for race, count in race_data if race == "Indian"), 0), total_customer),
            "Others": calculate_percentage(next((count for race, count in race_data if race == "Others"), 0), total_customer)
        }
    }
    return response