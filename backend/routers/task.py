from fastapi import APIRouter, Depends
from models.task import Task
from database import task_coll
from main import manager
from bson.objectid import ObjectId
import pymongo

router = APIRouter()

@router.post('/')
def create_task(task: Task, user=Depends(manager)):    
    task.creator = ObjectId(user['_id'])
    task_coll.insert_one(task.dict())        

    return {'message': 'Task successfully created'}

@router.get('/')
def get_tasks(user=Depends(manager)):
    res = task_coll.find({'creator': ObjectId(user['_id'])}).sort('created_at', pymongo.DESCENDING)
    data = []
    for item in list(res):
        item['_id'] = str(item['_id'])
        item['creator'] = str(item['creator'])
        data.append(item)
    return data