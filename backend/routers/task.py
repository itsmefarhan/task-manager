from fastapi import APIRouter, Depends
from models.task import Task
from database import task_coll
from main import manager
from bson.objectid import ObjectId
import pymongo
from datetime import datetime

router = APIRouter()

@router.post('/')
def create_task(task: Task, user=Depends(manager)):        
    task.creator = ObjectId(user['_id'])            
    response = task_coll.insert_one(task.dict())        
    new_record = task_coll.find_one({'_id': ObjectId(response.inserted_id)})
    new_record['_id'] = str(new_record['_id'])    
    new_record['creator'] = str(new_record['creator'])    
    
    return {'message': 'Task successfully created', "task": new_record}

@router.get('/')
def get_tasks(user=Depends(manager)):
    res = task_coll.find({'creator': ObjectId(user['_id'])}).sort('updated_at', pymongo.DESCENDING)
    data = []
    for item in list(res):
        item['_id'] = str(item['_id'])
        item['creator'] = str(item['creator'])
        data.append(item)
    return data

@router.delete('/{task_id}')
def delete_task(task_id: str, user=Depends(manager)):    
    task = task_coll.find_one_and_delete({'_id': ObjectId(task_id), 'creator': ObjectId(user['_id'])})    
    if task is None:
        return {'error': 'Task not found'}
    else:
        return {'message': 'Task deleted'}

@router.put('/{task_id}')
def update_task(task_id: str, user=Depends(manager)):
    task = task_coll.find_one_and_update(
        {'_id': ObjectId(task_id), 'creator': ObjectId(user['_id'])}, 
        {'$set':{'completed':True, 'updated_at': datetime.utcnow()}}
        )
    if task is None:
        return {'error': 'Task not found'}
    else:
        return {'message': 'Task updated'}