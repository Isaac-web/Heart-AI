import { StateCreator } from 'zustand';
import { ChatMessagesSlice, StoreState } from './types';

import { fetchChatMessages, sendChatMessage } from '@/api/chatMessages';
import { handleError } from '@/utils/errorHandler';
import { ChatMessage } from '@/types';

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
    get().removeError(fetchChatMessages.name)

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
  async sendChatMessage(data) {
    get().removeError(sendChatMessage.name);

    const mockId = Date.now().toString();
    try {
      // add chat message
      const userMessage: ChatMessage = {
        _id: mockId,
        chatSession: data.chatSessionId,
        text: data.text,
        user: null,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      };

      const currentUser = get().currentUser;
      if (currentUser) {
        userMessage.user = userMessage;
      }

      set((state) => ({ chatMessages: [...state.chatMessages, userMessage] }));

      set({ creatingChatMessages: true });

      const response = await sendChatMessage(data);

      const clonedChatMessages = [...get().chatMessages];
      const index = clonedChatMessages.findIndex((ch) => ch._id === mockId);
      clonedChatMessages.splice(index, 1, response.userMessage);

      const systemMessage: ChatMessage = {
        ...response.userMessage,
        text: response.systemMessage,
      };

      systemMessage.user = undefined;
      clonedChatMessages.push(systemMessage);

      set({ chatMessages: clonedChatMessages });

      //add chat message
    } catch (err) {
      console.log(err);
      const message = handleError(err as Error);
      get().addError({
        callingFunction: fetchChatMessages.name,
        message,
      });
    } finally {
      set({ creatingChatMessages: false });
    }
  },
});
