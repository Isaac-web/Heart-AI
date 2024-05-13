import { NewChatSessionFormData } from './../../types/index';
import { StateCreator } from 'zustand';
import { ChatSessionsSlice, StoreState } from '../types';
import { handleError } from '@/utils/errorHandler';
import { produce } from 'immer';
import {
  createChatSession,
  deleteChatSession,
  fetchUserChatSessions,
} from '@/api/chatSessions';

export const chatSessionsSlice: StateCreator<
  StoreState,
  [],
  [],
  ChatSessionsSlice
> = (set, get) => ({
  loading: false,
  isPending: false,
  data: [],
  async fetchChatSession() {
    try {
      get().removeError(this.fetchChatSession.name);
      set(
        produce((store: StoreState) => {
          store.entities.chatSessions.loading = true;
        })
      );
      const chatSessions = await fetchUserChatSessions();

      set(
        produce((store: StoreState) => {
          store.entities.chatSessions.data = chatSessions;
        })
      );
    } catch (err) {
      const message = handleError(err as Error);

      get().addError({
        callingFunction: this.fetchChatSession.name,
        message,
      });
    } finally {
      set(
        produce((store: StoreState) => {
          store.entities.chatSessions.loading = false;
        })
      );
    }
  },
  async createChatSession(data: NewChatSessionFormData) {
    try {
      get().removeError(this.createChatSession.name);
      set(
        produce((store: StoreState) => {
          store.entities.chatSessions.isPending = true;
        })
      );
      const chatSession = await createChatSession(data);

      set(
        produce((store: StoreState) => {
          store.entities.chatSessions.data.unshift(chatSession);
        })
      );
      return chatSession;
    } catch (err) {
      const message = handleError(err as Error);
      console.log(message);

      get().addError({
        callingFunction: this.createChatSession.name,
        message,
      });
    } finally {
      set(
        produce((store: StoreState) => {
          store.entities.chatSessions.isPending = false;
        })
      );
    }
  },
  async deleteChatSession(id: string) {
    get().removeError(this.deleteChatSession.name);
    try {
      set(
        produce((store: StoreState) => {
          store.entities.chatSessions.isPending = true;
        })
      );

      const chatSession = await deleteChatSession(id);

      set(
        produce((state: StoreState) => {
          const index = state.entities.chatSessions.data.findIndex(
            (ch) => ch._id === chatSession._id
          );

          state.entities.chatSessions.data.splice(index, 1);
        })
      );
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({ callingFunction: deleteChatSession.name, message });
    } finally {
      set(
        produce((store: StoreState) => {
          store.entities.chatSessions.isPending = false;
        })
      );
    }
  },
});
