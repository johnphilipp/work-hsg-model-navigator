from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Union
import json


class Login(BaseModel):
    email: str
    password: str


app = FastAPI()


origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "https://work-hsg-model-navigator.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def read_root():
    return {"Server Status": "Running"}


@app.post("/login/")
def login(login: Login):
    print("Received:", login.email, login.password)
    user_credentials = json.load(open("user_credentials.json"))
    if login.email not in user_credentials.keys():
        print("Email not found:", login.email)
        return HTTPException(status_code=401, detail="User not found")
    elif login.password != user_credentials[login.email]:
        print("Password incorrect:", user_credentials[login.email])
        return HTTPException(status_code=401, detail="Password incorrect")
    else:
        print("Credentials correct")
        return {"token": "123-456-789"}
