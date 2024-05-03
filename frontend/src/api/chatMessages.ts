import { apiClient } from './apiClient';

export const fetchChatMessage = async (sessionId: string) => {
  const { data } = await apiClient.get(`/chat-messages/${sessionId}`, {});

  return data;
};
