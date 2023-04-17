from fastapi import APIRouter, Depends
from models.task import Task
from database import task_coll
from main import manager
from bson.objectid import ObjectId

router = APIRouter()

@router.post('/task')
def create_task(task: Task, user=Depends(manager)):    
    task.creator = ObjectId(user['_id'])
    task_coll.insert_one(task.dict())        
    
    return {'message': 'Task successfully created'}