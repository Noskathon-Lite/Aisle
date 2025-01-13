# from fastapi import FastAPI

# import random

# app = FastAPI()

# @app.get('/')

# async def root():
    
#     return {"example: This is an example", "data:0"}

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class Fruit(BaseModel):
    name: str
    
class Fruits(BaseModel):
    fruits: List[Fruits]
    
app = FastAPI()

origins = [
    "https://localhost"
]