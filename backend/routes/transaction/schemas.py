from pydantic import BaseModel, conint
from typing import List
from datetime import date

class productItem(BaseModel):
    product_id: int
    qty: int

class TransactionRequest(BaseModel):
    customer_id: int
    product_list: List[productItem]

    class Config:
        from_attributes = True

class TransactionCreate(BaseModel):
    customer_id: int
    product_id: int
    qty: int
    transaction_date: date