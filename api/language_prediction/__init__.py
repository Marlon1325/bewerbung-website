from fastapi import APIRouter, Depends
from fastapi.responses import ORJSONResponse
from .plot import get_plot_base64
from pydantic import BaseModel
from utils import get_logedin_user
from .Agent import Agent

# init   ##################################################################



agent = Agent()

router = APIRouter(prefix="/language_prediction", dependencies=[Depends(get_logedin_user)])


# api    #####################################################################


class language_prediction_request(BaseModel):
    text: str

class language_prediction_response(BaseModel):
    class Probabilities(BaseModel):
        language: list[str]
        probability: list[float]
        
    probabilities: Probabilities
    prediction: list[float]
    plot: str


@router.post("", response_model=language_prediction_response)
def predict_language(data: language_prediction_request):    
    out = agent(data.text)
    data = { 
        "probabilities":  {
            "language": agent.languages,
            "probability":  list(map(lambda x: round(x, 2), out.tolist()))
        },
        "prediction": agent.languages[out.argmax()],
        "plot": get_plot_base64(agent.languages, out.tolist())
        }
    return ORJSONResponse(data)



__all__ = ["router"]