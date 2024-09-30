from sqlalchemy import Column, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship

from config.database import Base

# Transaction table (mapped to an existing table in the database)
class Transaction(Base):
    __tablename__ = 'transaction'

    customer_id = Column(Integer, ForeignKey('customer.customer_id'), primary_key=True)
    product_id = Column(Integer, ForeignKey('product.product_id'), primary_key=True)
    qty = Column(Integer)
    transaction_date = Column(Date)

    customer = relationship("Customer", back_populates="transactions")
    product = relationship("Product", back_populates="transactions")