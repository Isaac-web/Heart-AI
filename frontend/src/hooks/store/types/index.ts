import { LoginFormData, RegistrationFormData } from '@/types';

interface RequestError {
  callingFunction: string;
  message: string;
}

export interface RequestErrorState {
  errors: RequestError[];
  addError(error: RequestError): void;
  removeError(callingFunctionName: string): void;
  getError(callingFunctionName: string): RequestError | null;
}

export interface AuthSlice {
  login(data: LoginFormData): Promise<void>;
  register(data: RegistrationFormData): Promise<void>;
}

export type StoreState = RequestErrorState & AuthSlice;
