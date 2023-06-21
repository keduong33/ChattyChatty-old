import { create } from "zustand";
interface DialogueState {
  userInput: string;
  setUserInput: (newReply: string) => void;

  disabledChat: boolean;
  setDisabledChat: (disabled: boolean) => void;

  language: string;
  setLanguage: (newLanguage: string) => void;

  messageList: string[];
  setMessageList: (newMessage: string) => void;
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
  setMessageList(newMessage) {
    set((state) => ({ messageList: [...state.messageList, newMessage] }));
  },
}));
