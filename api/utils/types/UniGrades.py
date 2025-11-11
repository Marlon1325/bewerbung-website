from typing import Literal
from pydantic import BaseModel

type Grade = Literal[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
type Semester = Literal[1, 2, 3, 4, 5, 6]


class BaseClass(BaseModel):
    subject: str
    grade: Grade

class UniGrade(BaseClass):
    semester: Semester

class Grouped(BaseModel):
    class WithPassed(BaseClass):
        passed: bool
    semester: Semester
    list: list[WithPassed]
