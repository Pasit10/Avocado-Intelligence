from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from constant import constants

# Use async-compatible MySQL driver with SQLAlchemy
DATABASE_URL = f"mysql+aiomysql://{constants.USERNAME}:{constants.PASSWORD}@localhost:{constants.DATABASE_PORT}/{constants.DATABASE_NAME}"

# Create an async SQLAlchemy engine
engine = create_async_engine(DATABASE_URL, echo=False)

# Create an async session
SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,  # Use AsyncSession for async operations
    autocommit=False,
    autoflush=False,
)

# Create a base class for models
Base = declarative_base()
db = SessionLocal()

async def shutdown_db_section():
    print('[ASYNC DATABASE]: database has been close')
    await db.close()
    await engine.dispose()