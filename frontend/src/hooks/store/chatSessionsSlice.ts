import { StateCreator } from 'zustand';
import { ChatSessionSlice, StoreState } from './types';
import {
  createChatSession,
  deleteChatSession,
  fetchUserChatSessions,
} from '@/api/chatSessions';
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
  deletingChatSession: false,
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
  async deleteChatSession(sessionId) {
    try {
      set({ deletingChatSession: true });

      const chatSession = await deleteChatSession(sessionId);

      const clonedChatSessions = [...get().chatSessions];
      const index = clonedChatSessions.findIndex(
        (ch) => ch._id === chatSession._id
      );

      clonedChatSessions.splice(index, 1);

      set({ chatSessions: clonedChatSessions });
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({ callingFunction: deleteChatSession.name, message });
    } finally {
      set({ deletingChatSession: false });
    }
  },
});
