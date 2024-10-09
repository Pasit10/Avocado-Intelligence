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

    sex_data, age_data, race_data = repository.getDataCustomerData(datetype)
    response_dict = {}

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