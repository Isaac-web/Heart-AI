import {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from 'react';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  sex: number;
  userType: string;
  createdAt: string;
}

export interface UserUpdateFormData {
  name?: string;
  age?: number;
  sex?: number;
  phone?: string;
}

export interface UsersSearchParams {
  userType?: string;
  name?: string;
}

export interface RegistrationFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface DoctorUpdateFormData {
  firstName?: string;
  lastName?: string;
  age?: number;
  sex?: number;
  phone?: string;
  hospital?: string;
  supportingDocumentUrl?: string;
  bio?: string;
}

export interface APIRequestError {
  callingFunction: string;
  status: number;
  message: string;
}

export interface MedicalReportFormData {
  doctor: string;
  patient: string;
  age: number;
  sex: number;
  cp: number;
  trestbps: number;
  chol: number;
  fbs: number;
  restecg: number;
  thalach: number;
  exang: number;
  oldpeak: number;
  slope: number;
  ca: number;
  thal: number;
}

export interface MedicalReport {
  _id: string;
  cadioStatus: number;
  status: string;
  confidenceLevel: number;
  patient: User;
  doctor: Doctor;
  details: {
    age: number;
    sex: number;
    chestPainType: number;
    restingBloodPressure: number;
    serumColesterol: number;
    fastingBloodSugarLevel: number;
    restingElectrocardiographocResults: number;
    maximumHeartRate: number;
    exerciseInducedAngina: number;
    stDepression: number;
    slope: number;
    numberOfMajorVessels: number;
    thalliumStressTestResults: number;
  };
  createdAt: string;
}

export interface MedicalReportSearchParams {
  doctorId?: string;
}

export interface ChatSession {
  _id: string;
  patientId: string;
  title: string;
  medicalReport?: MedicalReport;
  createdAt: string;
  updatedAt: string;
}

export interface NewChatSessionFormData {
  title: string;
}

export interface ChatMessage {
  _id: string;
  text: string;
  chatSession: string;
  user?: User | null;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessageFormData {
  text: string;
  chatSessionId: string;
  context: string | object;
}

export interface ChatMessageResponse {
  userMessage: {
    _id: string;
    text: string;
    chatSession: string;
    user: User;
    createdAt: string;
    updatedAt: string;
  };
  systemMessage: string;
}

export interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  sex: number;
  phone: string;
  hospital: string;
  supportingDocumentUrl: string;
  bio: string;
  email: string;
  createdAt: string;
}

export interface AppTextInputProps {
  label?: string;
  type?: string;
  value?: string;
  helperText?: string;
  placeholder?: string;
  error?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  onKeyDown?(e: KeyboardEvent<HTMLInputElement>): void;
}

interface SelectOption {
  label: string;
  value: string;
}

export interface AppSelectInputProps
  extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder: string;
  error?: boolean;
  helperText?: string;
}

export interface Column<T> {
  label: string;
  value: string;
  render?(item: T): ReactNode;
}

export interface Appointment {
  _id: string;
  patient: User;
  doctor: Doctor;
  appointmentDate: string;
  status: number;
  createdAt: string;
}

export interface AppointmentFormData {
  patientId: string;
  doctorId: string;
  appointmentDate: string;
}

export interface AppointmentsSearchParams {
  doctorId?: string;
  status?: number;
}

export interface DoctorDashboardSummary {
  numberOfPendingAppointments: number;
  numberOfHealthyReports: number;
  numberOfUnHealthyReports: number;
}
