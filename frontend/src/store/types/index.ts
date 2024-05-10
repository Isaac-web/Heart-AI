import {
  Appointment,
  ChatMessage,
  ChatMessageFormData,
  ChatSession,
  Doctor,
  DoctorUpdateFormData,
  MedicalReport,
  MedicalReportFormData,
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

export interface UsersSlice {
  users: User[];
  fetchUsers(params?: UsersSearchParams): Promise<void>;
}

export interface MedicalReportSlice {
  medicalReports: MedicalReport[];
  creatingMedicalReport: boolean;
  loadingMedicalReports: boolean;
  fetchMedicalReports(params: MedicalReportSearchParams): Promise<void>;
  createMedicalReport(data: MedicalReportFormData): Promise<void>;
  getCurrentUserMedicalReports(): Promise<void>;
}

export interface ChatSessionSlice {
  chatSessions: ChatSession[];
  creatingChatSession: boolean;
  loadingChatSession: boolean;
  deletingChatSession: boolean;
  fetchChatSessions(): Promise<void>;
  createChatSession(data: { title: string }): Promise<void>;
  deleteChatSession(sessionId: string): Promise<void>;
}

export interface ChatMessagesSlice {
  chatMessages: ChatMessage[];
  creatingChatMessages: boolean;
  loadingChatMessages: boolean;
  fetchChatMessages(sessionId: string): Promise<void>;
  sendChatMessage(data: ChatMessageFormData): Promise<void>;
}

export interface NamesEntity {
  loading: boolean;
  isPending: boolean;
  total: number;
  skip: number;
  limit: number;
  data: string[];
  addData(name: string): void;
}

export interface AppointmentEntity {
  loading: boolean;
  isPending: boolean;
  data: Appointment[];
  fetchAppointments(): Promise<void>;
}

export interface AppointmentDetail {
  loading: boolean;
  isPending: boolean;
  data: Appointment;
  getAppointmentById(id: string): Promise<void>;
}

export interface MedicalReportEntity {
  loading: boolean;
  isPending: boolean;
  data: MedicalReport[];
  createMedicalReport(data: MedicalReportFormData): Promise<void>;
  fetchMedicalReports(params?: MedicalReportSearchParams): Promise<void>;
}

export interface DoctorAuth {
  loading: boolean;
  isPending: boolean;
  data: Doctor;
  login(): Promise<void>;
  register(data: RegistrationFormData): Promise<void>;
  update(doctorId: string, data: DoctorUpdateFormData): Promise<void>;
}

export interface AuthSlice {
  auth: {
    doctor: DoctorAuth;
    user: {
      name: string;
    };
  };
}

export interface AppDataSlice {
  entities: {
    appointments: AppointmentEntity;
    medicalReports: MedicalReportEntity;
  };
  details: {
    appointment: AppointmentDetail;
  };
}

export type StoreState = RequestErrorState &
  AuthSlice &
  UsersSlice &
  MedicalReportSlice &
  ChatSessionSlice &
  ChatMessagesSlice &
  AppDataSlice;
