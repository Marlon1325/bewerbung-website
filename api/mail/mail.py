
import re, html, os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText



def escape_html(*args: str):
    return tuple(map(html.escape, args))


def HTML_Content(title:str, username:str, name:str, message:str,  email:str=None):
    name, message = escape_html(name, message)
    with open("mail/email.html") as f:
        text = f.read()
    text = text.replace("{{USERNAME}}", username)
    text = text.replace("{{TITLE}}", title)
    text = text.replace("{{NAME}}", name)
    if email:
      text = text.replace("{{EMAIL}}", email)
      text = text.replace("{{DISPLAYNONECLASS}}", "")
    else:
      text = text.replace("{{DISPLAYNONECLASS}}", "displayNone")
    text = text.replace("{{MESSAGE}}", message)
    return text



def confirmationEmail(username:str, name:str, email:str, message:str):
    msg = MIMEMultipart()
    SENDER_ADDRESS = os.getenv("EMAIL_ADDRESS")
    msg["From"] = SENDER_ADDRESS
    msg["Subject"] = "Bestätigungsemail"
    msg["To"] = email
    content = HTML_Content("Bestätigungsemail von der Bewerbungsseite",username, name, message)
    msg.attach(MIMEText(content, "html"))
    return msg

def notificationEmail(username:str, name:str, email:str, message:str):
    msg = MIMEMultipart()
    SENDER_ADDRESS = os.getenv("EMAIL_ADDRESS")
    EMAIL_RECIPIENT = os.getenv("EMAIL_RECIPIENT")
    msg["From"] = SENDER_ADDRESS
    msg["Subject"] = f"Neue Antwort von der Bewerbungswebsite"
    msg["To"] = EMAIL_RECIPIENT
    content = HTML_Content("Neue Antwort von der Bewerbungswebsite",username, name, message, email)
    msg.attach(MIMEText(content, "html"))
    return msg



