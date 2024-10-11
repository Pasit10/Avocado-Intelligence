from pydantic import BaseModel, conint
from typing import List, Optional
from datetime import date

#class

# ยังคิดไม่ออกว่าเขียนไร

class ProductResponse(BaseModel):
    product_id: int
    name: str
    price: float
    detail: str
    product_img: Optional[bytes]
    class Config:
        from_attributes = True