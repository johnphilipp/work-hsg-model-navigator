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


class Model(BaseModel):
    category: str
    name: str


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
        return {"token": "123-456-7890"}


@app.get("/categories/")
def categories():
    models_data = json.load(open("models_data.json"))
    out = [x["category"] for x in models_data]
    return {"categories": out}


@ app.post("/models/")
def models(models: Models):
    print("Received:", models.categories)
    models_data = json.load(open("models_data.json"))
    out = [x for x in models_data if x["category"] in models.categories]
    return {"models": out}


@ app.post("/model/")
def model(model: Model):
    print("Received:", model)
    models_data = json.load(open("models_data.json"))
    sub = [x for x in models_data if x["category"] == model.category]
    out = [x for x in sub[0]["models"] if x["name"] == model.name]
    return {"model": out}
