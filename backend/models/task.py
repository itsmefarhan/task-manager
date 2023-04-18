from pydantic import BaseModel, Field
from datetime import datetime

def default_created_at():
    return datetime.now()

def default_updated_at():
    return datetime.now()

class Task(BaseModel):
    text: str
    completed: bool = False
    created_at: str = Field(default_factory=default_created_at)
    updated_at: str = Field(default_factory=default_updated_at)
    creator: str