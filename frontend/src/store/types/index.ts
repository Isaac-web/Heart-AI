import {
  Appointment,
  AppointmentsSearchParams,
  ChatMessage,
  ChatMessageFormData,
  ChatSession,
  Doctor,
  DoctorUpdateFormData,
  LoginFormData,
  MedicalReport,
  MedicalReportFormData,
  MedicalReportSearchParams,
  NewChatSessionFormData,
  RegistrationFormData,
  User,
  UserUpdateFormData,
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

export interface AppointmentEntity {
  loading: boolean;
  isPending: boolean;
  data: Appointment[];
  fetchAppointments(params?: AppointmentsSearchParams): Promise<void>;
}

export interface AppointmentDetail {
  loading: boolean;
  isPending: boolean;
  data: Appointment;
  getAppointmentById(id: string): Promise<Appointment | undefined>;
}

export interface MedicalReportEntity {
  loading: boolean;
  isPending: boolean;
  data: MedicalReport[];
  createMedicalReport(
    data: MedicalReportFormData
  ): Promise<MedicalReport | undefined>;
  fetchMedicalReports(params?: MedicalReportSearchParams): Promise<void>;
}

export interface MedicalReportDetail {
  loading: boolean;
  isPending: boolean;
  data: MedicalReport;
  getMedicalReportById(id: string): Promise<MedicalReport | undefined>;
}

export interface ChatSessionsSlice {
  loading: boolean;
  isPending: boolean;
  data: ChatSession[];
  fetchChatSession(): Promise<void>;
  createChatSession(
    data: NewChatSessionFormData
  ): Promise<ChatSession | undefined>;
  deleteChatSession(id: string): Promise<void>;
}

export interface ChatMessagesSlice {
  loading: boolean;
  isPending: boolean;
  data: ChatMessage[];
  fetchChatMessages(sessionId: string): Promise<void>;
  sendChatMessage(data: ChatMessageFormData): Promise<void>;
}

export interface DoctorAuth {
  loading: boolean;
  isPending: boolean;
  data: Doctor;
  login(data: LoginFormData): Promise<void>;
  register(data: RegistrationFormData): Promise<void>;
  update(doctorId: string, data: DoctorUpdateFormData): Promise<void>;
  getCurrentDoctor(): Promise<void>;
}

export interface UserAuth {
  loading: boolean;
  isPending: boolean;
  data: User;
  login(data: LoginFormData): Promise<void>;
  register(data: RegistrationFormData): Promise<void>;
  update(data: UserUpdateFormData): Promise<void>;
}

export interface AuthSlice {
  auth: {
    doctor: DoctorAuth;
    user: UserAuth;
  };
}

export interface DataSlice {
  entities: {
    appointments: AppointmentEntity;
    medicalReports: MedicalReportEntity;
    chatSessions: ChatSessionsSlice;
    chatMessages: ChatMessagesSlice;
  };
  details: {
    appointment: AppointmentDetail;
    medicalReport: MedicalReportDetail;
  };
}

export interface AppData {
  app: {
    drawerCollapsed: boolean;
    drawerWidth: number;
    collapseDrawer(): void;
    expandDrawer(): void;
  };
}

export type StoreState = RequestErrorState & AuthSlice & DataSlice & AppData;
