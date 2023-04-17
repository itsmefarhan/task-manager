from fastapi import APIRouter
from models.task import Task
from database import task_coll

router = APIRouter()

# @router.post('/task')
# async def create_task(task: Task):
#     task_coll.insert_one(task.dict())
#     return {'message': 'Task successfully created'}