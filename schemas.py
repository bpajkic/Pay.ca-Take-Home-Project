# schemas.py
from pydantic import BaseModel
from datetime import date

class UserBase(BaseModel):
    first_name: str
    last_name: str
    user_name: str
    date_of_birth: date

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    pass

class User(UserBase):
    id: int

    class Config:
        from_attributes = True