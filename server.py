from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from agent import page_summerize

app = FastAPI()


@app.get("/")
def root():
    return {"Hello": "World"}


@app.post("/items")
def summerize(url: str, question: str):
    result = page_summerize(url=url,
                            question=question)
    return result
