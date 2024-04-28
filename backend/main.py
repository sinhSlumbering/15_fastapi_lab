from fastapi import FastAPI, Request,  HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
client = MongoClient("mongodb://localhost:27017/")
db = client["my_database"]
users_collection = db["users"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"]
)

class User(BaseModel):
    username: str
    password: str  
    email: str
    phone_number: str

@app.post("/register")
async def register(user: User):
    print("request Here")
    existing_user = users_collection.find_one( {"username": user.username})
    existing_email = users_collection.find_one({"email": user.email})

    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    if existing_email:
        raise HTTPException(status_code=400, detail="Email has already registered")
    print(user)
    # Save user data to MongoDB
    users_collection.insert_one({
        "username": user.username,
        "password": user.password,
        "email": user.email,
        "phone_number": user.phone_number
    })

    return {"message": "Registration successful"}
