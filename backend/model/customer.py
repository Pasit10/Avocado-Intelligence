from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from config.database import Base

class Customer(Base):
    __tablename__ = "customer"

    customer_id = Column(Integer, primary_key=True, index=True)
    sex = Column(String[255])
    age = Column(Integer)
    race = Column(String[255])

    transactions = relationship("Transaction", back_populates="customer")