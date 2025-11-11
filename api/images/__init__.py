from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import FileResponse
from pathlib import Path
from utils import get_logedin_user
import base64
# router = APIRouter(prefix="/images", dependencies=[Depends(get_logedin_user)], tags=["images"])
router = APIRouter(prefix="/images", dependencies=[], tags=["images"])


def Image(file:str):
    path = Path("./images/src") / file
    if path.exists():
        return FileResponse(path)
    else:
        raise HTTPException(404, "Image not found")


@router.get("/{name}")
def image(name: str):
    match(name):
        case "signature": return Image("signature.png")
        case "profilpicture": return Image("profilpicture.png")

    raise HTTPException(404, "Image not found")
