from fastapi import Depends
from sqlalchemy.orm import Session
from . import model, schemas
from config.database import db

def getAllProduct():
    product = db.query(model.Product).all()
    return product