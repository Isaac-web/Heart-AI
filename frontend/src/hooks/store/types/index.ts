import {
  LoginFormData,
  MedicalReport,
  MedicalReportRequest,
  MedicalReportSearchParams,
  RegistrationFormData,
  User,
  UsersSearchParams,
} from '@/types';

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
  authPending: boolean;
  login(data: LoginFormData): Promise<void>;
  register(data: RegistrationFormData): Promise<void>;
}

export interface UsersSlice {
  users: User[];
  fetchUsers(params?: UsersSearchParams): Promise<void>;
}

export interface MedicalReportRequestSlice {
  medicalReportRequests: MedicalReportRequest[];
  loadingMedicalReportRequests: boolean;
  fetchMedicalReportRequests(): Promise<void>;
}

export interface MedicalReportSlice {
  medicalReports: MedicalReport[];
  loadingMedicalReports: boolean;
  fetchMedicalReports(params: MedicalReportSearchParams): Promise<void>;
}

export type StoreState = RequestErrorState &
  AuthSlice &
  UsersSlice &
  MedicalReportRequestSlice &
  MedicalReportSlice;
