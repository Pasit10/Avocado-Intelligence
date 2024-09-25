from sqlalchemy import Column, Integer, String, Date, Float, LargeBinary, ForeignKey
from sqlalchemy.orm import relationship

from config.database import Base

class Transaction(Base):
    __tablename__ = 'transaction'

    # Define columns
    customer_id = Column(Integer, ForeignKey('customer_transaction.customer_id'), primary_key=True)
    product_id = Column(Integer, ForeignKey('product.product_id'), primary_key=True)
    qty = Column(Integer)
    transaction_date = Column(Date)

    # Relationships to link to other tables
    customer = relationship("CustomerTransaction", back_populates="transactions")
    product = relationship("Product", back_populates="transactions")


# Define relationship in the corresponding models

class Customer(Base):
    __tablename__ = 'customer'

    customer_id = Column(Integer, primary_key=True)
    sex = Column(String[255])
    age = Column(Integer)
    race = Column(String[255])

    # Back reference for transactions
    transactions = relationship("Transaction", back_populates="customer")


class Product(Base):
    __tablename__ = 'product'

    product_id = Column(Integer, primary_key=True)
    name = Column(String[255])
    price = Column(Float)
    detail = Column(String[255])
    product_img = Column(LargeBinary)

    # Back reference for transactions
    transactions = relationship("Transaction", back_populates="product")
