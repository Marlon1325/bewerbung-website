from pydantic import BaseModel, model_validator
from datetime import datetime

class LogedInUser(BaseModel):
    name: str
    admin: bool
    exp: datetime | str | None = None


class User(BaseModel):
    id: int | None = None
    name: str
    # admin: bool
    password: str | None = None

class Coverletter(BaseModel):
    title: str
    subject: str
    text: str


class User_Coverletter(User):
    coverletter: Coverletter | None
    @model_validator(mode='before')
    def remove_coverletter_if_admin(cls, values:dict):
        if values.get("admin"):
            if "coverletter" in values:
                values["coverletter"] = None
        else:
            if "coverletter" not in values or values["coverletter"] is None:
                raise ValueError("Non-admin users must have a coverletter")
        return values
