import {
  ChatMessage,
  ChatMessageFormData,
  ChatSession,
  LoginFormData,
  MedicalReport,
  MedicalReportFormData,
  MedicalReportRequest,
  MedicalReportSearchParams,
  NewChatSessionFormData,
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
  loadingCurrentUser: boolean;
  currentUser: User | null;
  login(data: LoginFormData): Promise<void>;
  getCurrentUser(): Promise<void>;
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
  createChatSession(data: NewChatSessionFormData): Promise<void>;
  deleteChatSession(sessionId: string): Promise<void>;
}

export interface ChatMessagesSlice {
  chatMessages: ChatMessage[];
  creatingChatMessages: boolean;
  loadingChatMessages: boolean;
  fetchChatMessages(sessionId: string): Promise<void>;
  sendChatMessage(data: ChatMessageFormData): Promise<void>;
}

export type StoreState = RequestErrorState &
  AuthSlice &
  UsersSlice &
  MedicalReportRequestSlice &
  MedicalReportSlice &
  ChatSessionSlice &
  ChatMessagesSlice;
