import uvicorn
from fastapi import FastAPI
from Heart_Params import HeartParameter
import numpy as np
import pickle
import pandas as pd

app = FastAPI()
pickle_in = open("svm.pkl","rb")
classifier=pickle.load(pickle_in)

#print(classifier)

@app.get('/')
def index():
    return {'message': 'Hello, World'}


@app.get('/{name}')
def get_name(name: str):
    return {'Welcome To My Heart Disease Predictor': f'{name}'}

@app.post('/predict')
def predict_disease(data:HeartParameter):
    age = data.age        
    sex = data.sex
    trestbps = data.trestbps  
    chol  = data.chol 
    fbs = data.fbs
    thalach = data.thalach  
    exang   = data.exang
    oldpeak  = data.oldpeak
    slope  =  data.slope 
    ca   = data.ca 
    cp_1  = data.cp_1
    cp_2  = data.cp_2
    cp_3  = data.cp_3
    restecg_1 = data.restecg_1 
    restecg_2 = data.restecg_2 
    thal_1  = data.thal_1
    thal_2  = data.thal_2
    thal_3 = data.thal_3



    features = np.array([[age,sex,trestbps,chol,fbs,thalach,exang,oldpeak,slope,ca,
    cp_1, cp_2 ,cp_3,restecg_1, restecg_2, thal_1, thal_2,thal_3]])

    prediction = classifier.predict(features)

    prediction = prediction[0].item()

    return {
        'prediction': prediction
    }

#    Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
    
#uvicorn app:app --reload