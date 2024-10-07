from pydantic import BaseModel, conint
from typing import List, Optional
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

class Customer(BaseModel):
    customer_id: int
    sex: str
    age: int
    race: str

class ProductTransactionResponse(BaseModel):
    product_id: int
    name: str
    price: float
    qty: int

class TransactionResponse(BaseModel):
    customer_id: int
    product_list: List[productItem]
    transaction_date: date

    class Config:
        from_attributes = True

class TransactionResponseByID(BaseModel):
    customer: Customer
    product_list: List[ProductTransactionResponse]
    transaction_date: date

    class Config:
        from_attributes = True

class ProductTransaction(BaseModel):
    product_id: int
    product_img: Optional[bytes]
    name: str
    price: float
    detail: str
    total_qty: int

class group(BaseModel):
    sex: List[str]
    age: List[str]
    race: List[str]
    
class series(BaseModel):
    sex: List[List[int]]
    age: List[List[int]]
    race: List[List[int]]
class TransactionProduct(BaseModel):
    product: ProductTransaction
    dates: List[str]
    group: group
    series: series
    