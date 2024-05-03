import { ChatSession } from '@/types';
import { apiClient } from './apiClient';

export const fetchUserChatSessions = async () => {
  const { data: resData } = await apiClient.get<{ data: ChatSession[] }>(
    '/chat-sessions/me'
  );

  return resData.data;
};

export const createChatSession = async (data: { title: string }) => {
  const { data: resData } = await apiClient.post<ChatSession>(
    '/chat-sessions/me',
    data
  );

  return resData;
};
