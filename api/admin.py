from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from utils import *
from utils.types import *
import json,re
from datetime import date
from pydantic import BaseModel


router = APIRouter(
    prefix="/admin", 
    dependencies=[Depends(isAdmin)], 
    tags=["admin"]
    )



@router.get("/user", tags=["user"], response_model=list[User_Coverletter])
async def admin_route(con:sql.Connection=Depends(sql.connect_db)):
    query = sql.text("""
                    SELECT user.id, user.name, coverletter.title, coverletter.subject, coverletter.text
                    FROM user
                    LEFT JOIN coverletter ON coverletter.userID = user.ID 
                    WHERE NOT admin 
                    """)
    result = await con.execute(query)
    data = result.fetchall()
    def coverletter_to_json(row:dict):
        row["coverletter"] = {
            "title": row["title"],
            "subject": row["subject"],
            "text": row["text"],
            } 
        del row["title"], row["text"], row["subject"]
        return row

    data = sql.to_dict(data)
    data = tuple(map(coverletter_to_json, data))
    return data



    



@router.post("/newuser", tags=["user"])
async def addUser(new_user: User_Coverletter, con:sql.Connection=Depends(sql.connect_db)):
    salt = new_salt()
    try:
        query = sql.text("INSERT INTO user (name, admin, password, salt) VALUES (:name,:admin, :password, :salt)")
        await con.execute(
            query,
              {
                "name":     new_user.name, 
                "admin":    False,
                "password": Hash(new_user.password.encode("utf-8"), salt), 
                "salt":     salt
            })
        
        query = sql.text("""
             INSERT INTO coverletter (userID, title, subject, text)
             SELECT id,:title, :subject, :text
             FROM user
             WHERE name = :name
        """)
        await con.execute(query, { 
            "name": new_user.name,
            "title": new_user.coverletter.title,
            "subject": new_user.coverletter.subject,
            "text":  new_user.coverletter.text
            })
    except Exception as error:
        raise HTTPException(status_code=404, detail=str(error)) 
        



class UpdateUser(User):
    password: str | None = None
    coverletter: Coverletter | None = None

@router.put("/updateuser", tags=["user"])
async def update_user(user: UpdateUser, con:sql.Connection=Depends(sql.connect_db) ):
    try:
        query = sql.text(f"""UPDATE user SET  
                         name=:name 
                         {", password=:password, salt=:salt" if user.password else "" }
                         WHERE id=:id
                    """)
        params = {
                "id": user.id,
                "name":     user.name,  
            }

        if user.password:
            salt = new_salt()
            params["salt"] = salt
            params["password"] = Hash(user.password.encode("utf-8"), salt)
        
        await con.execute(query, params)

        await con.execute(sql.text("DELETE FROM coverletter WHERE userID=:id"), {"id": user.id})

        await con.execute(sql.text("INSERT INTO coverletter (userID, title, subject, text) VALUES(:id, :title, :subject, :text)"), {
            "id": user.id,
            "title": user.coverletter.title,
            "subject": user.coverletter.subject,
            "text": user.coverletter.text
            })

    except Exception as error:
        raise HTTPException(400, str(error))





@router.delete("/deleteuser", tags=["user"])
async def deleteUser(id: str | int, con:sql.Connection=Depends(sql.connect_db)):
    await con.execute(sql.text("DELETE FROM coverletter WHERE userID = :id"), {"id":id})
    await con.execute(sql.text("DELETE FROM user WHERE id = :id"), {"id":id})



class SQLStatement(BaseModel):
    statement: str

@router.post("/sql/execute")
async def execute_sql(arg:SQLStatement, con: sql.Connection=Depends(sql.connect_db)):
    try:
        result = await con.execute(sql.text(arg.statement))
        if result.returns_rows:
            data = result.fetchall()
            return sql.to_dict(data)
        
    except Exception as error:
        raise HTTPException(400, str(error))


@router.get("/sql/backup")
def backup_db():
    try:
        zip_buffer = sql.Backup().toZip()
        return StreamingResponse(
            zip_buffer,
            media_type="application/zip",
            headers={"Content-Disposition": "attachment; filename=backup.zip"}
        )
    except Exception as error:
        raise HTTPException(500, str(error))


@router.post("/uni-grades", tags=["resume"])
async def insert_uni_grades(data:UniGrades.UniGrade, con: sql.Connection=Depends(sql.connect_db)):
    query = sql.text("INSERT INTO uni_grades (semester, subject, grade ) VALUES (:sem,:sub,:grade)")
    await con.execute(query, {
        "sem": data.semester,
        "sub": data.subject, 
        "grade":data.grade
    })



@router.post("/resume", tags=["resume"])
async def insert_resume(data:Resume.Entry, con: sql.Connection=Depends(sql.connect_db)):
    if data.end:
        if data.start > data.end: # 422
            raise HTTPException(413, "start-date must be <= end-date")
    else:
        data.end = None
        if data.start > date.today().strftime("%Y-%m-%d"):
            raise HTTPException(414, "start-date must be <= today")
        
    query = sql.text("INSERT INTO resume (category, title, subtitle, start, end ) VALUES (:category, :title, :subtitle, :start, :end)")
    await con.execute(query,  {
                    "category":data.category,
                    "title":data.title,
                    "subtitle": data.subtitle,
                    "start": data.start,
                    "end": data.end
                })    
