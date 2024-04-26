from fastapi import FastAPI,Form,Response,Request
from pydantic import BaseModel
from chatbot import get_response
from model import model 
import pandas as pd
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5501"], # Allow requests from your frontend's origin
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods
    allow_headers=["*"], # Allow all headers
)
class Message(BaseModel):
    text: str
    context: str
    session_id: str

port = int(os.getenv("PORT", 9000))


@app.post("/chat")
async def chat_with_bot(message: Message):
    session_id = message.get("session_id")
    context=message.get("context")
    text=message.get("text")
    output = get_response(context=context,message=text, session_id=session_id)
    return {"response": output}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=port)