from pydantic import BaseModel
from typing import Optional

class ProductCreate(BaseModel):
    name: str
    price: float
    detail: str
    product_img: bytes

class ProductResponse(BaseModel):
    product_id: int
    name: str
    price: float
    detail: str
    product_img: Optional[bytes]
    class Config:
        from_attributes = True

class ProductUpdate(BaseModel):
    name: str
    price: float
    detail: str
    product_img: bytes