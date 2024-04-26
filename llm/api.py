from fastapi import FastAPI
from pydantic import BaseModel
from chatbot import get_response
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5501"], # Allow requests from frontend's origin
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
    session_id = message.session_id
    context=message.context
    text=message.text
    response = get_response(context=context,message=text, session_id=session_id)
    output=("").join(response)
    return {"response": output}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=port)