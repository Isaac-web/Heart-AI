import chromadb,os
from dotenv import load_dotenv
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA, LLMChain
from sentence_transformers import SentenceTransformer
from langchain_community.llms.huggingface_endpoint import HuggingFaceEndpoint

load_dotenv()

# llm = ChatOpenAI(model="gpt-3.5-turbo-0125", api_key="os.getenv("OPENAI_API_KEY")")

llm = HuggingFaceEndpoint(
    repo_id="HuggingFaceH4/zephyr-7b-beta",
    task="text-generation",
    repetition_penalty= 1.03,
    verbose=False,
    max_new_tokens= 512,
    top_k= 30,
    temperature= 0.4,
    huggingfacehub_api_token= "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",
    
)

template = """
Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use three sentences maximum and keep the answer as concise as possible.
Always politely request if they would like to know more or anything else they want to know.

{context}

Question: {question}

Helpful Answer:
"""

# context = """
# Name: John Doe
# Age: 55
# Sex: Male
# """
"""
"age": 70,
    "sex": 1,
    "cp": 0,
    "trestbps": 145,
    "chol": 174,
    "fbs": 0,
    "restecg": 1,
    "thalach": 125,
    "exang": 1,
    "oldpeak": 2.6,
    "slope": 0,
    "ca": 0,
    "thal": 3
  },index=[0])

  "age": 53,
    "sex": 1,
    "cp": 0,
    "trestbps": 140,
    "chol": 203,
    "fbs": 1,
    "restecg": 0,
    "thalach": 155,
    "exang": 1,
    "oldpeak": 3.1,
    "slope": 0,
    "ca": 0,
    "thal": 3
"""

prompt = PromptTemplate(
        input_variables=["context", "question"], template=template
    )
chain = LLMChain(llm=llm, prompt=prompt)


def get_response(context, message):
    response = chain.invoke(input={"context":context,'question':message})
    return response['text']

