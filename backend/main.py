from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_login import LoginManager
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

SECRET = os.environ.get('SECRET')

manager = LoginManager(SECRET, '/login')

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

from routers import user
from routers import task

app.include_router(user.router)
app.include_router(task.router)