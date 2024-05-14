import uvicorn
from fastapi import FastAPI
from Heart_Params import HeartParameter
import numpy as np
import pickle
import warnings
warnings.filterwarnings('ignore')

app = FastAPI()
pickle_in = open("svc.pkl","rb")
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
    cp  = data.cp
    trestbps = data.trestbps  
    col  = data.chol 
    fbs = data.fbs
    restecg = data.restecg
    thalach = data.thalach  
    exang   = data.exang
    oldpeak  = data.oldpeak
    slope  =  data.slope 
    ca   = data.ca  
    thal  = data.thal



    features = np.array([[age,sex,cp,trestbps,col,fbs,restecg,thalach,exang,oldpeak,
    slope,ca,thal]])

    prediction = classifier.predict(features)
    confidence:float = abs(classifier.decision_function(features) )
    
    probability = 1 / (1 + np.exp(-confidence))
    
    confidence_percentage:float = round(probability, 2)
    

    prediction = prediction[0].item()

    result:str = ''

    details = {
        "age":age,     
        "sex": sex, 
        "chest pain type":cp, 
        "resting blood pressure": trestbps,
        "serum colesterol": col,
        "fasting blood sugar level" : fbs,
        "resting electrocardiographoc results" : restecg,
        "maximum heart rate": thalach,
        "exercise induced agina" : exang,
        "st depression" : oldpeak,
        "slope" : slope,
        "number of major vessels" : ca,
        "thallium stress test_results" : thal,
    }





    if prediction == 1:
        result = f'Unfortunately, you have heart disease'
    else:
        result = f'Your heart is fine, you do not have heart disease'

    return {
        'status': result,
        'details': details,
        'confidence_level': confidence_percentage
    }

#    Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
    
#uvicorn app:app --reload