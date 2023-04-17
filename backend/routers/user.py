from fastapi import APIRouter, HTTPException
from models.user import User
from database import user_coll

router = APIRouter()

@router.post('/register')
async def register_user(user: User):
    user_exists = user_coll.find_one({'email': user.email})
    if user_exists:
        raise HTTPException(status_code=400, detail='User already exists')
    else:
        user.hash_password()
        user_coll.insert_one(user.dict())
        return {'message': 'User successfully registered'}