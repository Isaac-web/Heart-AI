from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder,HumanMessagePromptTemplate
from langchain_openai.chat_models import ChatOpenAI
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_mongodb.chat_message_histories import MongoDBChatMessageHistory
import os 
from dotenv import load_dotenv

load_dotenv()


model =  ChatOpenAI(
        api_key= os.getenv("OPENAI-API_KEY"),
        temperature=0.2,
        model='gpt-3.5-turbo-1106'
    )

prompt = ChatPromptTemplate.from_messages(
    [
    
             (
            "system",
            """You are hearty a cardiologist, provide accurate answers based on the {context} provided.
            You should pay particular english semantics. 
            If you don't know the answer to any question truthfully say so and do not hallucinate.""",
        ),
            
        MessagesPlaceholder(variable_name="chathistory"),
        HumanMessagePromptTemplate.from_template(
            "{input}"
        ),
    ]
)
chain = prompt | model


conversation = RunnableWithMessageHistory(
    chain,
    lambda session_id: MongoDBChatMessageHistory(
        session_id=session_id,
        connection_string=os.getenv("MONGO_URI"),
        database_name=os.getenv("MONGO_INITDB_DATABASE"),
        collection_name=os.getenv("COLLECTION"), ),
    input_messages_key="input",
    history_messages_key="chathistory",
)


def get_response(context, message, session_id):
    response = conversation.invoke(
        {"context": context, "input": message},
        config={"configurable": {"session_id": session_id}},
    )

    return response.content

