import { StateCreator } from 'zustand';
import { ChatSessionSlice, StoreState } from './types';
import { createChatSession, fetchUserChatSessions } from '@/api/chatSessions';
import { handleError } from '@/utils/errorHandler';

export const createChatSessionsSlice: StateCreator<
  StoreState,
  [],
  [],
  ChatSessionSlice
> = (set, get) => ({
  chatSessions: [],
  loadingChatSession: false,
  creatingChatSession: false,
  fetchChatSessions: async () => {
    try {
      set({ loadingChatSession: true });
      const chatSessions = await fetchUserChatSessions();
      set({ chatSessions });
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({ callingFunction: fetchUserChatSessions.name, message });
    } finally {
      set({ loadingChatSession: false });
    }
  },
  async createChatSession(data) {
    try {
      set({ creatingChatSession: true });
      const chatSession = await createChatSession(data);
      set((store) => ({
        chatSessions: [chatSession, ...store.chatSessions], // Adding new chat session to store state
      }));
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({ callingFunction: createChatSession.name, message });
    } finally {
      set({ creatingChatSession: false });
    }
  },
});
