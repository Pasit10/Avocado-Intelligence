from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from constant import  constants

DATABASE_URL = f"mysql+pymysql://{constants.USERNAME}:{constants.PASSWORD}@localhost:{constants.DATABASE_PORT}/{constants.DATABASE_NAME}"

# Create the SQLAlchemy engine
engine = create_engine(DATABASE_URL,echo=True)

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for models
Base = declarative_base()

db = SessionLocal()

def shutdown_db_section():
    print('[DATABASE]: database has been close')
    db.close()