import { ChatMessage, ChatMessageFormData, ChatMessageResponse } from '@/types';
import { apiClient } from './apiClient';

export const fetchChatMessages = async (sessionId: string) => {
  const { data: resData } = await apiClient.get<{ data: ChatMessage[] }>(
    `/chat-messages/${sessionId}`,
    {}
  );

  return resData.data;
};

export const sendChatMessage = async (data: ChatMessageFormData) => {
  const { data: resData } = await apiClient.post<{ data: ChatMessageResponse }>(
    '/chat-messages',
    data
  );

  return resData.data;
};
