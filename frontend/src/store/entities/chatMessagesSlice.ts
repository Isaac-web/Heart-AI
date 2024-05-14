import { StateCreator } from 'zustand';
import { ChatMessagesSlice, StoreState } from '../types';
import { handleError } from '@/utils/errorHandler';
import { produce } from 'immer';
import { fetchChatMessages, sendChatMessage } from '@/api/chatMessages';
import { ChatMessage } from '@/types';

export const chatMessagesSlice: StateCreator<
  StoreState,
  [],
  [],
  ChatMessagesSlice
> = (set, get) => ({
  loading: false,
  isPending: false,
  data: [],
  async fetchChatMessages(sessionId) {
    get().removeError(this.fetchChatMessages.name);

    set(
      produce((store: StoreState) => {
        store.entities.chatMessages.loading = true;
      })
    );
    try {
      const chatMessages = await fetchChatMessages(sessionId);

      set(
        produce((store: StoreState) => {
          store.entities.chatMessages.data = chatMessages;
        })
      );
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({
        callingFunction: this.fetchChatMessages.name,
        message,
      });
    } finally {
      set(
        produce((store: StoreState) => {
          store.entities.chatMessages.loading = false;
        })
      );
    }
  },

  async sendChatMessage(data) {
    get().removeError(this.sendChatMessage.name);

    const mockId = Date.now().toString();
    try {
      // add chat message
      const userMessage: ChatMessage = {
        _id: mockId,
        chatSession: data.chatSessionId,
        text: data.text,
        user: get().auth.user.data,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      };

      set(
        produce((store: StoreState) => {
          store.entities.chatMessages.data.push(userMessage);
          store.entities.chatMessages.isPending = true;
        })
      );

      const response = await sendChatMessage(data);

      set(
        produce((store: StoreState) => {
          const index = store.entities.chatMessages.data.findIndex(
            (ch) => ch._id === mockId
          );

          store.entities.chatMessages.data.splice(
            index,
            1,
            response.userMessage
          );

          const systemMessage: ChatMessage = {
            ...response.userMessage,
            text: response.systemMessage,
            user: undefined,
          };

          store.entities.chatMessages.data.push(systemMessage);
        })
      );
    } catch (err: any) {
      const message = handleError(err as Error);
      get().addError({
        callingFunction: this.sendChatMessage.name,
        message,
      });
    } finally {
      set(
        produce((store: StoreState) => {
          store.entities.chatMessages.isPending = false;
        })
      );
    }
  },
});
