import { ChatSession, NewChatSessionFormData } from '@/types';
import { apiClient } from './apiClient';

export const fetchUserChatSessions = async () => {
  const { data: resData } = await apiClient.get<{ data: ChatSession[] }>(
    '/chat-sessions/me'
  );

  return resData.data;
};

export const createChatSession = async (data: NewChatSessionFormData) => {
  const { data: resData } = await apiClient.post<{ data: ChatSession }>(
    '/chat-sessions/me',
    data
  );

  return resData.data;
};

export const deleteChatSession = async (sessionId: string) => {
  const { data: resData } = await apiClient.delete<{ data: ChatSession }>(
    `/chat-sessions/me/${sessionId}`
  );

  return resData.data;
};
