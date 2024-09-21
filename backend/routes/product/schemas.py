from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    price: float
    detail: str
    product_img: bytes

class ProductResponse(ProductCreate):
    product_id: int

    class Config:
        orm_mode = True