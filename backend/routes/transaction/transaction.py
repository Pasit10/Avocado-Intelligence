from fastapi import APIRouter, status

transaction = APIRouter()

@transaction.post(path="/addtransaction",status_code=status.HTTP_201_CREATED)
def addTransaction():
    pass