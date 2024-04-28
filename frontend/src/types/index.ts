export interface LoginFormData {
  email: string;
  password: string;
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
