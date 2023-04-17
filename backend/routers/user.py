from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login.exceptions import InvalidCredentialsException
from models.user import User
from database import user_coll
from main import manager

router = APIRouter()

@manager.user_loader()
def load_user(email: str):
    res = user_coll.find_one({'email': email})
    if res is None:
        raise HTTPException(status_code=400, detail='Invalid credentials')
    else:
        res['_id'] = str(res['_id'])
        return res

@router.post('/register')
async def register_user(user: User):
    user_exists = user_coll.find_one({'email': user.email})
    if user_exists:
        raise HTTPException(status_code=400, detail='User already exists')
    else:
        user.hash_password()
        user_coll.insert_one(user.dict())
        return {'message': 'User successfully registered'}

@router.post('/login')
async def login_user(data: OAuth2PasswordRequestForm = Depends()):
    email = data.username
    password = data.password

    user_data = load_user(email)    
    user = User(**user_data)

    if not user_data:
        raise InvalidCredentialsException
    elif not user.verify_password(password):
        raise InvalidCredentialsException

    access_token = manager.create_access_token(data={'sub': email})

    return {'access_token': access_token, 'uid': str(user_data['_id'])}