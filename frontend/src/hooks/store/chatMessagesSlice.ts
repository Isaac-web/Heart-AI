import { StateCreator } from 'zustand';
import { ChatMessagesSlice, StoreState } from './types';

import { fetchChatMessages } from '@/api/chatMessages';
import { handleError } from '@/utils/errorHandler';

export const createChatMessagesSlice: StateCreator<
  StoreState,
  [],
  [],
  ChatMessagesSlice
> = (set, get) => ({
  chatMessages: [],
  loadingChatMessages: false,
  creatingChatMessages: false,
  async fetchChatMessages(sessionId) {
    set({ loadingChatMessages: true });
    try {
      const chatMessages = await fetchChatMessages(sessionId);
      set({ chatMessages });
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({
        callingFunction: fetchChatMessages.name,
        message,
      });
    } finally {
      set({ loadingChatMessages: false });
    }
  },
});
