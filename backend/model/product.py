from sqlalchemy import Column, Integer, String, Float, LargeBinary
from sqlalchemy.orm import relationship

from config.database import Base

class Product(Base):
    __tablename__ = "product"

    product_id = Column(Integer, primary_key=True, index=True)
    name = Column(String[255])
    price = Column(Float)
    detail = Column(String[255])
    product_img = Column(LargeBinary)

    transactions = relationship("Transaction", back_populates="product")