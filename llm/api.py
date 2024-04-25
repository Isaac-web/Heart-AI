from fastapi import FastAPI,Form,Response,Request
from pydantic import BaseModel
from chatbot import get_response
from model import model 
import pandas as pd

app = FastAPI()

class Message(BaseModel):
    text: str



@app.post('/check')
async def check_health_data(
    response: Response,
    age: int = Form(...),
    sex: int = Form(...),
    cp: int = Form(...),
    trestbps: int = Form(...),
    chol: int = Form(...),
    fbs: int = Form(...),
    restecg: int = Form(...),
    thalach: int = Form(...),
    exang: int = Form(...),
    oldpeak: float = Form(...),
    slope: int = Form(...),
    ca: int = Form(...),
    thal: int = Form(...)
):
    new_data = pd.DataFrame({
        "age": [age],
        "sex": [sex],
        "cp": [cp],
        "trestbps": [trestbps],
        "chol": [chol],
        "fbs": [fbs],
        "restecg": [restecg],
        "thalach": [thalach],
        "exang": [exang],
        "oldpeak": [oldpeak],
        "slope": [slope],
        "ca": [ca],
        "thal": [thal],
    }, index=[0])

    answer = model.predict(new_data)
    if answer == 1:
        response_text = "Status: You have heart disease"
    elif answer == 0:
        response_text = "Status: You not have heart disease"
    
    response.set_cookie(key="health_status", value=response_text)
    return {"response": response_text}


@app.post("/chat")
async def chat_with_bot(message: Message, request: Request):
    health_status = request.cookies.get("health_status")
    if health_status:
        context = health_status
    else:
        context = "No health status found"
    
    output = get_response(context=context, message=message.text)
    response= output.split('\n')
    return {"response": response[0:2]}

