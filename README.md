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

# Chatbot

Loads the environmental variable and creates a  create_chain function that takes in the model and prompt and returns a chain
```python
  load_dotenv()
  def create_chain():
      model =  ChatOpenAI(
              api_key= os.getenv("OPENAI_API_KEY"),
              temperature=0.2,
              model='gpt-3.5-turbo-1106'
          )

      prompt = ChatPromptTemplate.from_messages(
          [
              (
                  "system",
                  """You are Heartty, a cardiologist, provide accurate answers based on the {context} provided. 
                  If you don't know the answer to any question truthfully say so and do not hallucinate.""",
              ),
              MessagesPlaceholder(variable_name="chathistory"),
              ("human", "{input}"),
          ]
      )
      chain = prompt | model
      return chain
```

chain = create_chain calls the create_chain function and we create a dictionary named store. We then create a function that retrieves or creates a session_id.
```python 
  chain = create_chain()
  store = {}


  def get_session_history(session_id: str) -> BaseChatMessageHistory:
      if session_id not in store:
          store[session_id] = ChatMessageHistory()
      return store[session_id]
```


We run the chain with the RunnableWithMessageHistory 
```python
    conversation = RunnableWithMessageHistory(
        chain,
        get_session_history,
        input_messages_key="input",
        history_messages_key="chathistory",
      
    )
    def get_response(context, message, session_id):
        response = conversation.invoke(
            {"context": context, "input": message},
            config={"configurable": {"session_id": session_id}},
        )

        return response.content
```        
