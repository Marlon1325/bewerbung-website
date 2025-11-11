import dotenv
dotenv.load_dotenv(".env")

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, Request, APIRouter
from fastapi.responses import Response, ORJSONResponse
from datetime import timedelta, timezone, datetime
from pydantic import BaseModel
from utils.types import *
from utils import *
import importlib, os
from contextlib import asynccontextmanager

# init   #######################################################################################################


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup-Code
    async for con in sql.connect_db():
        con:sql.Connection
        salt = new_salt()
        password = os.getenv("ADMIN_PASSWORD")
        query = sql.text("INSERT INTO user (admin, name, password, salt) VALUES (1, :name, :password, :salt)")
        await con.execute(query,
                     {"name":"admin", "password": Hash(password, salt), "salt":salt }
                    )
        print("created admin")

    yield
    # Shutdown-Code (optional)
    # await cleanup()


app = FastAPI(
    lifespan=lifespan,
    default_response_class=ORJSONResponse,
    docs_url=None,     # deactivate Swagger UI
    redoc_url=None,      # deactivate ReDoc
    openapi_url=None     # deactivate OpenAPI-Schema
)


app.add_middleware(
    CORSMiddleware, 
    # allow_origins= ["http://localhost:3000"],
    allow_origins= ["https://marloneulberg.de"],
    allow_credentials= True,
    allow_methods= ["*"],
    allow_headers= ["*"]
)




# import routes ########################################################################################################


for moduleName in ("mail", "resume", "language_prediction", "admin", "images"):
    module = importlib.import_module(moduleName)
    router = getattr(module, "router", None)
    if router is None:
        raise ImportError(f"Module {moduleName} has no attribute 'router'")
    elif not isinstance(router, APIRouter):
        raise ImportError(f"'router' in Module {moduleName} is not an instance of APIRouter")
    else:
        app.include_router(router)
        print(f"{moduleName}: router imported")



# api    ################################################################################################################

@app.get("/")
def root():
    return {"message" : "fastapi server is running ⚡"}


class LoginData(BaseModel):
    name: str
    password: str

@app.post("/login")
async def login(user: LoginData,  con:sql.Connection=Depends(sql.connect_db)):
    resp_401 = Response("Falscher Benutzername oder Passwort", status_code=401, headers={"WWW-Authenticate": "Bearer"})
    user.name = user.name.strip()
    salt = await get_salt(user.name)
    if salt is None:
        return resp_401

    hashed_password = Hash(user.password, salt)

    query = sql.text("SELECT admin FROM user WHERE name = :name AND password = :password")
    result = await con.execute(query, {"name": user.name, "password": hashed_password})
    data = result.fetchone()

    if data is None:
        return resp_401
    
    isadmin = data[0]
    # expire_date = datetime.now(timezone.utc) + timedelta(hours=2)
    response = ORJSONResponse({"message": "Login erfolgreich", "admin": isadmin})
    response = set_token(
        response, 
        {"name": user.name, "admin": isadmin},
        # expire_date
    )
    return response
    



@app.get("/coverletter", response_model=Coverletter)
async def coverletter(user:LogedInUser=Depends(get_logedin_user), con:sql.Connection=Depends(sql.connect_db)):
    query = sql.text("""
        SELECT coverletter.title, coverletter.subject, coverletter.text
            FROM coverletter INNER JOIN user ON coverletter.userID = user.id
        WHERE user.name = :name; 
    """)
    result = await con.execute(query, {"name": user.name})
    data = sql.to_dict(result.fetchone())
    if not user.admin:
        return data
    else:
        raise HTTPException(status_code=404, detail="admin has no coverletter")




@app.get("/currentuser", response_model=LogedInUser)
def getCurrentUser(user=Depends(get_logedin_user)):
    return user


@app.get("/logout")
def logout(request:Request):
    try:
        user = get_logedin_user(request)
        expire_date = datetime.now(timezone.utc) - timedelta(hours=1)
        response = set_token(Response(), user, expire_date)
        return response
    except:
        return


@app.get("/contact", response_model=Contact)
async def contact(_=Depends(get_logedin_user), con:sql.Connection=Depends(sql.connect_db)):
    result = await con.execute(sql.text("SELECT name, value FROM contact"))
    data = dict(sql.to_tuple(result.fetchall()))
    return data
