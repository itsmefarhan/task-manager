from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.environ.get('MONGO_URI')

connection = MongoClient(MONGO_URI)
db = connection['task-manager']
user_coll = db['users']
task_coll = db['tasks']