import { ChatMessage } from '@/types';
import { apiClient } from './apiClient';

export const fetchChatMessages = async (sessionId: string) => {
  const { data: resData } = await apiClient.get<{ data: ChatMessage[] }>(
    `/chat-messages/${sessionId}`,
    {}
  );

  return resData.data;
};
