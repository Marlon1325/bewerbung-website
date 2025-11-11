from pydantic import BaseModel, field_validator
from typing import Literal
import re


type Category = Literal["Schulbildung", "Praktika"]


class BaseClass(BaseModel):
    title: str
    subtitle: str | None = None
    start: str
    end: str | None = None

    @field_validator("start")
    @classmethod
    def check_month_format_start(cls, v):
        pattern = re.compile(r"^\d{4}-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?$")
        if not pattern.match(v):
            raise ValueError("Date format is not YYYY-MM or YYYY-MM-DD")
        return v

    @field_validator("end")
    @classmethod
    def check_month_format_end(cls, v):
        if v is not None:
            return cls.check_month_format_start(v)
            
class Grouped(BaseModel):
    category: Category
    list: list[BaseClass]

class Entry(BaseClass):
    category: Category