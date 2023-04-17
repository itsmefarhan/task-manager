# Task Manager

### Features
- User registration
- User login

User can:
- Create a task
- Get own tasks
- Delete own task
- Update own task

### Dependencies
- fastapi
- uvicorn[standard]
- pymongo
- fastapi-login
- python-multipart

### Environment Variable
Create **.env** file at the root of **backend** directory and add:
- MONGO_URI
- SECRET (enter any value)

### Environment Variable (nextjs)
- NEXT_PUBLIC_API_URL