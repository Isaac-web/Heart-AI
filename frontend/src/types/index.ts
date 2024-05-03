export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  userType: string;
}

export interface UsersSearchParams {
  userType?: string;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  userType: string;
}

export interface APIRequestError {
  callingFunction: string;
  status: number;
  message: string;
}

export interface MedicalReportFormData {
  doctorId: string;
  patientId: string;
  age: number;
  sex: number;
  trestbps: number;
  chol: number;
  fbs: number;
  thalach: number;
  exang: number;
  oldpeak: number;
  slope: number;
  ca: number;
  cp_1: number;
  cp_2: number;
  cp_3: number;
  restecg_1: number;
  restecg_2: number;
  thal_1: number;
  thal_2: number;
  thal_3: number;
}

export interface MedicalReport {
  _id: string;
  patientId: {
    _id: string;
    name: string;
    email: string;
    userType: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  doctorId: {
    _id: string;
    name: string;
    email: string;
    userType: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  age: number;
  sex: number;
  trestbps: number;
  chol: number;
  fbs: number;
  thalach: number;
  exang: number;
  oldpeak: number;
  slope: number;
  ca: number;
  cp_1: number;
  cp_2: number;
  cp_3: number;
  restecg_1: number;
  restecg_2: number;
  thal_1: number;
  thal_2: number;
  thal_3: number;
  cardioStatus: number;
  createdAt: string;
  updated: string;
}

export interface MedicalReportSearchParams {
  doctorId?: string;
}

export interface MedicalReportRequest {
  _id: string;
  patientId: {
    _id: string;
    name: string;
    email: string;
    userType: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  doctorId: {
    _id: string;
    name: string;
    email: string;
    userType: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  status: 0;
  createdAt: string;
  updatedAt: string;
}

export interface ChatSession {
  _id: string;
  patientId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  _id: string;
  text: string;
  chatSession: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
}
