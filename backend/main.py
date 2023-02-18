from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import json
import time


class Login(BaseModel):
    email: str
    password: str


class Models(BaseModel):
    categories: List[str]


class RunModel(BaseModel):
    prompt: str
    negative_prompt: str = None
    number: int = 3  # between 1 and 8
    number_of_steps: int = 50
    seed: int = None


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
    return {"categories": categories_data}


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


# This method would be running on a different microservice -- only here for testing purposes
@app.post("/loadModel")
def load_model():
    """
    Zusätzlich muss im Header stehen:
    - Authorization: Bearer daGoveitgididNeltifwoylchISlith5
    """
    time.sleep(3)
    return {"message": "Model loaded successfully"}


@app.post("/runModel")
def run_model(props: RunModel):
    return {
        "prompt": props.prompt,
        "images": [
            "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"
        ]
    }

    return True
