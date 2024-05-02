from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder,HumanMessagePromptTemplate
from langchain_openai.chat_models import ChatOpenAI
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_mongodb.chat_message_histories import MongoDBChatMessageHistory
import os 
from dotenv import load_dotenv

load_dotenv()

def create_chain():
    # mode is chat model
    model =  ChatOpenAI(
            api_key= os.getenv("OPENAI-API_KEY"),
            temperature=0.2,
            model='gpt-3.5-turbo-1106' )

    # prompt for the system
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
    # chain is creating a chain where model takes prompts output as input
    chain = prompt | model
    return chain

# creates instance of function
chain = create_chain()

# conversaion here creates another chain that takes input from the previous chain and retrieves and stores messages to a mongodb collection using the session_id parameter
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

# function to get response from bot 
def get_response(context, message, session_id):
    response = conversation.invoke(
        {"context": context, "input": message},
        config={"configurable": {"session_id": session_id}},
    )

    return response.content

