from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import json


class Login(BaseModel):
    email: str
    password: str


class Models(BaseModel):
    categories: List[str]


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
    user_credentials = json.load(open("data/user_credentials.json"))
    if login.email not in user_credentials.keys():
        print("Email not found:", login.email)
        return HTTPException(status_code=401, detail="User not found")
    elif login.password != user_credentials[login.email]:
        print("Password incorrect:", user_credentials[login.email])
        return HTTPException(status_code=401, detail="Password incorrect")
    else:
        print("Credentials correct")
        return {"token": "123-456-7890"}


@app.get("/categories/")
def categories():
    categories_data = json.load(open("data/categories_data.json"))
    out = [x["category"] for x in categories_data]
    return {"categories": out}


@app.get("/models/{categories}")
def models(categories):
    print("Received:", categories)
    models_data = json.load(open("data/models_data.json"))
    out = [x for x in models_data if x["category"] in categories]
    return {"models": out}


@app.get("/model/{model_id}")
def model(model_id):
    print("Received:", model)
    models_data = json.load(open("data/models_data.json"))
    out = [x for x in models_data if x["id"] == model_id]
    return {"model": out}
