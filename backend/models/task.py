from pydantic import BaseModel
from datetime import datetime

class Task(BaseModel):
    text: str
    completed: bool = False
    created_at: datetime = datetime.utcnow
    updated_at: datetime = datetime.utcnow
    creator: str