from pydantic import BaseModel
from datetime import datetime
from passlib.context import CryptContext

# Create a password hashing context
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

class User(BaseModel):
    username: str
    email: str
    password: str
    created_at: datetime = datetime.utcnow()

    def hash_password(self):
        self.password = pwd_context.hash(self.password)

    def verify_password(self, plain_pass):
        return pwd_context.verify(plain_pass, self.password)
