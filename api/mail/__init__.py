from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from .mail import *
from utils.types import Email
from fastapi.responses import ORJSONResponse, RedirectResponse
import dotenv, os
import smtplib
from utils import get_logedin_user
from utils.types import LogedInUser

router = APIRouter(prefix="/sendemail")



# api    #####################################################################



class EmailParams(Email):
    name: str
    message: str

@router.post("")
def sendemail(args: EmailParams, user:LogedInUser=Depends(get_logedin_user)):
    try:
        dotenv.load_dotenv(".env")
        SENDER_ADDRESS = os.getenv("EMAIL_ADDRESS")
        PASSWORD = os.getenv("EMAIL_PASSWORD")
        username = user.name
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(SENDER_ADDRESS, PASSWORD)
            email_data = {
                "username": username,
                "name": args.name,
                "email": args.email,
                "message": args.message
            }
            server.send_message(confirmationEmail(**email_data))
            server.send_message(notificationEmail(**email_data))
        return ORJSONResponse({"message":"Email erfolgreich gesendet"}, 200)
    
    except Exception:
        raise HTTPException(status_code=500, detail="Fehler beim senden der Emails")
            

        

__all__ = ["router"]