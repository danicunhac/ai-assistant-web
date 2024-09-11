import { deleteMessage, getMessages, sendMessage } from "@/api/chat";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Message = {
  id: string;
  text: string;
  sender: "user" | "system";
  edited?: boolean;
};

export type Chat = {
  messages: Message[];
  loading: boolean;
};

type ChatActions = {
  get: () => Promise<void>;
  send: (text: string) => Promise<void>;
  delete: (id: string) => Promise<void>;
  //   update: (id: string, text: string) => Promise<void>;
};

export const useChatStore = create<Chat & ChatActions>()(
  persist(
    (set) => ({
      messages: [] as Message[],
      loading: false,
      get: async () => {
        set({ loading: true });

        const messages = await getMessages();

        set({ loading: false, messages });
      },
      send: async (text: string) => {
        if (!text) return;

        set({ loading: true });

        const messages = (await sendMessage(text)) as Message[];

        set((state) => ({
          loading: false,
          messages: [...state.messages, ...messages],
        }));
      },
      delete: async (id?: string) => {
        if (!id) return;

        set({ loading: true });

        const messages = await deleteMessage(id);

        set({ messages, loading: false });
      },
      //   update: async (id?: string, text?: string) => {},
    }),
    {
      name: "chatStore",
    }
  )
);
