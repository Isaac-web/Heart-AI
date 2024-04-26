from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai.chat_models import ChatOpenAI
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from dotenv import load_dotenv
import os


load_dotenv()

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

store = {}


def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]


conversation = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="chathistory",
   
)

# results = "Status: You have heart disease"
# context = f""""
# base on this your details;
#         "age": 57,
#         "sex": 1,
#         "cp": 2,
#         "trestbps": 156,
#         "chololestrol": 300,
#         "fbs": 1,
#         "restecg": 0,
#         "thalach": 156,
#         "exang": 1,
#         "oldpeak": 3.2,
#         "slope": 0,
#         "ca": 0,
#         "thal": 3
#         {results}
#     """



def get_response(context, message, session_id):
    response = conversation.invoke(
        {"context": context, "input": message},
        config={"configurable": {"session_id": session_id}},
    )

    return response.content

# print(get_response(context=context, message="what is my status", session_id=345))

# while True:
#     user_input = input("User :")
#     if user_input.lower() == 'exit':
#             break
#     response = conversation.invoke(
#         {"context": context, "input": user_input},
#         config={"configurable": {"session_id": "abc123"}},
#     )

#     print(response.content)


