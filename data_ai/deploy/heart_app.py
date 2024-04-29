import uvicorn
from fastapi import FastAPI
from Heart_Params import HeartParameter
import numpy as np
import pickle

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
    resting_blood_pressure = data.trestbps  
    serum_cholesterol  = data.chol 
    fasting_blood_sugar_level = data.fbs
    maximum_heart_rate = data.thalach  
    exercise_induced_agina   = data.exang
    st_depression  = data.oldpeak
    slope  =  data.slope 
    number_of_major_vessels   = data.ca 
    chest_pain_type_1  = data.cp_1
    chest_pain_type_2  = data.cp_2
    chest_pain_type_3  = data.cp_3
    rest_ecg_results_1 = data.restecg_1 
    rest_ecg_results_2 = data.restecg_2 
    thallium_stress_results_1  = data.thal_1
    thallium_stress_results_2  = data.thal_2
    thallium_stress_results_3 = data.thal_3



    features = np.array([[age,sex,resting_blood_pressure,serum_cholesterol,fasting_blood_sugar_level,maximum_heart_rate,exercise_induced_agina,st_depression,slope,number_of_major_vessels,
    chest_pain_type_1, chest_pain_type_2 ,chest_pain_type_3,rest_ecg_results_1, rest_ecg_results_2, thallium_stress_results_1,thallium_stress_results_2, thallium_stress_results_3]])

    prediction = classifier.predict(features)

    prediction = prediction[0].item()

    result = ''

    details = {
        "age":age,     
        "sex": sex, 
        "resting blood pressure" : resting_blood_pressure, 
        "serum cholesterol": serum_cholesterol,
        "fasting blood sugar level": fasting_blood_sugar_level,
        "maximum heart rate" : maximum_heart_rate,
        "exercise induced agina" : exercise_induced_agina,
        "st_depression" : st_depression,
        "slope" : slope,
        "number of major vessels" : number_of_major_vessels,
        "chest pain type_1"  : chest_pain_type_1,
        "chest pain type_2"  :  chest_pain_type_2,
        "chest pain type_3"  : chest_pain_type_3,
        "resting electrocardiographoc results_1" : rest_ecg_results_1,
        "resting electrocardiographoc results_2" : rest_ecg_results_2,
        "thallium stress test_results_1" : thallium_stress_results_1,
        "thallium stress test_results_2" : thallium_stress_results_2,
        "thallium stress_test_results_3" : thallium_stress_results_3
    }





    if prediction == 1:
        result = f'Unfortunately, you have heart disease'
    else:
        result = f'Your heart is fine, you do not have heart disease'

    return {
        'prediction': result,
        'details': details
    }

#    Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
    
#uvicorn app:app --reload