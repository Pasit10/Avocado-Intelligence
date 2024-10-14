from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from constant import  constants

DATABASE_URL = f"mysql+pymysql://{constants.USERNAME}:{constants.PASSWORD}@localhost:{constants.DATABASE_PORT}/{constants.DATABASE_NAME}"

# Create the SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    pool_size=200000,  # Increase the pool size if needed
    max_overflow=200000,
    pool_timeout=10,  # Increase timeout if necessary
    pool_pre_ping=True
)

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for models
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def shutdown_db_section():
    print('[DATABASE]: database has been close')
    engine.dispose()