from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class User(BaseModel):
    id: int
    first_name: str
    last_name: str
    user_name: str
    date_of_birth: str

users = []

@app.post("/users/", response_model=User)
def create_user(user: User):
    users.append(user)
    return user

@app.get("/users/", response_model=List[User])
def read_users():
    return users

@app.put("/users/{user_id}", response_model=User)
def update_user(user_id: int, user: User):
    users[user_id] = user
    return user

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    users.pop(user_id)
    return {"message": "User deleted"}