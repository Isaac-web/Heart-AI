# Heart-Disease-Prediction-Group-2
This project implements a FastAPI endpoint to interact with a chatbot focused on heart disease conversations. The chatbot is designed to provide information and support based on a user's diagnosis from a heart disease prediction model.

# Getting Started
1.Clone this repository to your local machine.
2.Install the required dependencies using pip:
`pip install -r requirements.txt`

3. Set up environment variables:
Create a .env file in the root directory.
Add your OpenAI API key to the .env file:
`OPENAI_API_KEY=your_openai_api_key_here
PORT=9000`
4.Run the FastAPI server:
`uvicorn main:app --reload`
 # Usage
## Chat Endpoint
URL: /chat
Method: POST

Request Body:

`{
  "text": "Hello, how can I help you?",
  "context": "heart_disease",
  "session_id": "unique_session_id"
}`

Response:

`{
  "response": "Chatbot response here"
}`

# Example Usage
Using cURL:
`curl -X POST "http://localhost:9000/chat" -H "Content-Type: application/json" -d '{"text": "Hello, how can I help you?", "context": "heart_disease", "session_id": "unique_session_id"}'
`
