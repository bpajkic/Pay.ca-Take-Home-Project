# models.py
from sqlalchemy import Column, Integer, String, Date
from database import Base

class User(Base):
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    user_name = Column(String, unique=True, index=True)
    date_of_birth = Column(Date)