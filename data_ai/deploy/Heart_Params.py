from pydantic import BaseModel


class HeartParameter(BaseModel):
    
    age:        int  
    sex :       int  
    trestbps:   int  
    chol :      int  
    fbs :       int  
    thalach:    int  
    exang   :   int  
    oldpeak  :  float
    slope   :   int  
    ca   :      int    
    cp_1  :     int  
    cp_2  :     int  
    cp_3  :     int  
    restecg_1:   int  
    restecg_2:  int  
    thal_1 :     int  
    thal_2 :     int  
    thal_3 :     int  
