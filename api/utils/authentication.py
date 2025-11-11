from fastapi import HTTPException
from fastapi.requests import Request
from fastapi.responses import Response
from jose import jwt
import secrets
from datetime import datetime
import hashlib
from .database import sql
from .types import LogedInUser

SECRET_KEY = secrets.token_urlsafe(32)


def Hash(value:bytes|str, salt:bytes)->bytes:
    if isinstance(value, str):
        value = value.encode("utf-8")
    value: bytes
    """
    hashes value with scrypt\n
    returns as hexadecimal
    """
    return hashlib.scrypt(value, salt=salt, n=1<<14, r=8, p=1, dklen=64)



def get_logedin_user(request: Request)->LogedInUser:
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Token fehlt")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return LogedInUser(**payload)
    except Exception:
        raise HTTPException(status_code=401, detail="Token ungültig")
    

def isAdmin(request: Request)->LogedInUser:
    user = get_logedin_user(request)
    if not user.admin:
        raise HTTPException(status_code=403, detail="Keine Adminrechte")
    return user


def create_access_token(data: dict | LogedInUser, expire: datetime=None)->str:
    "creates jwt token"
    if isinstance(data, LogedInUser):
        data:dict = data.model_dump()
    to_encode = data.copy() 
    if expire:
        to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")
    return encoded_jwt

def set_token(response:Response, token_data, expire_date:datetime=None, name:str="access_token"):
    token = create_access_token(token_data, expire_date)
    response.set_cookie(key=name, value=token, httponly=True, expires=expire_date)
    return response


async def get_salt(username: str)->bytes | None:
    "returns salt from database"
    async for con in sql.connect_db():
        result = await con.execute(sql.text("SELECT salt FROM user WHERE name = :name"), {"name": username})
        data = result.fetchone()
        if data is not None:
            return data[0]
    

def new_salt(length=16)->bytes:
    """random hexadecimal token"""
    return secrets.token_bytes(length)


