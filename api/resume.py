from fastapi import APIRouter, Depends
from fastapi.responses import ORJSONResponse
from utils import *
from utils.types import *
from typing import get_args

# init   ##################################################################

router = APIRouter(
    prefix="/resume", 
    dependencies=[Depends(get_logedin_user)],
    tags=["resume"]
    )


# api    #####################################################################

@router.get("", response_model=list[Resume.Grouped])
async def get_resume(con:sql.Connection=Depends(sql.connect_db)):
    categories = get_args(Resume.Category.__value__)
    data = []
    for category in categories:
        query = sql.text("""
            SELECT category, title, subtitle, start, end 
            FROM resume 
            WHERE category = :category
            ORDER BY start DESC, end DESC
        """)
        result = await con.execute(query, {"category": category})
        
        data.append({
            "category": category,
            "list": sql.to_dict(result.fetchall())
        })  
    return data




@router.get("/uni-grades", response_model=list[UniGrades.Grouped])
async def get_uni_grades(con:sql.Connection=Depends(sql.connect_db)):
    data = []
    semester = get_args(UniGrades.Semester.__value__)
    for sem in semester:
        query = sql.text("""
                SELECT subject, grade, 
                        CASE 
                            WHEN grade > 4 THEN TRUE 
                            ELSE FALSE 
                        END AS passed 
                FROM uni_grades 
                WHERE SEMESTER = :semester
                ORDER BY grade DESC
        """)
        result = await con.execute(query, {"semester": sem})
        grade_list = sql.to_dict(result.fetchall())
        data.append({
            "semester": sem,
            "list": grade_list
            })
    return data


