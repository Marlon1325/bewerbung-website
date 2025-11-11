
from typing import Literal
from pydantic import BaseModel, field_validator, model_validator
import re
from datetime import datetime

from . import Resume, UniGrades
from .user import *

class Email(BaseModel):
    email: str
    @classmethod
    @field_validator('email')
    def validate_email(cls, v):
        pattern = re.compile(r"^[\w\.-]+@[\w\.-]+\.\w+$")
        if not pattern.match(v):
            raise ValueError("Invalid email format")
        return v


class Contact(BaseModel):
    email: str
    phone: str
    GitHub: str

