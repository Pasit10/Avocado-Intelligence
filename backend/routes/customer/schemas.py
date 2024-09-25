from pydantic import BaseModel

class CustomerCreate(BaseModel):
    sex: str
    age: int
    race: str

class CustomerRequest(BaseModel):
    customer_img: str

class CustomerResponse(BaseModel):
    customer_id: int
    sex: str
    age: int
    race: str
