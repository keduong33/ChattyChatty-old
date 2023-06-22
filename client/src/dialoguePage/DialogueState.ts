import { create } from "zustand";
interface DialogueState {
  userInput: string;
  setUserInput: (newReply: string) => void;

  disabledChat: boolean;
  setDisabledChat: (disabled: boolean) => void;

  language: string;
  setLanguage: (newLanguage: string) => void;

  messageList: string[];
  addNewMessage: (newMessage: string) => void;

  userMessageList: string[];
  addNewUserMessage: (newMessage: string) => void;

  botMessageList: string[];
  addNewBotMessage: (newMessage: string) => void;
}

export const useDialogueState = create<DialogueState>()((set) => ({
  userInput: "",
  setUserInput(newUserInput) {
    set(() => ({ userInput: newUserInput }));
  },
  disabledChat: true,
  setDisabledChat(disabled) {
    set(() => ({ disabledChat: disabled }));
  },

  language: "",
  setLanguage(newLanguage) {
    set(() => ({ language: newLanguage }));
  },

  messageList: [],
  addNewMessage(newMessage) {
    set((state) => ({ messageList: [...state.messageList, newMessage] }));
  },

  userMessageList: [],
  addNewUserMessage(newMessage: string) {
    set((state) => ({
      userMessageList: [...state.userMessageList, newMessage],
    }));
  },

  botMessageList: [],
  addNewBotMessage(newMessage: string) {
    set((state) => ({ botMessageList: [...state.botMessageList, newMessage] }));
  },
}));
