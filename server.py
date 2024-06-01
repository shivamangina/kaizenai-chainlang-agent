from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from agent import page_summarize

app = FastAPI()


@app.get("/")
def root():
    return {"Hello": "World"}


@app.post("/summarize")
def summarize(url: str, question: str):
    result = page_summarize(url=url,
                            question=question)
    return result
