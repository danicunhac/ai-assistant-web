import Image from "next/image";
import { XIcon, LoaderIcon } from "lucide-react";

import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

import AvaPic from "@/images/ava.png";
import { useEffect, useRef } from "react";
import { useChatStore } from "@/hooks/chat";

import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { UserMessage } from "./UserMessage";
import { Separator } from "../ui/separator";

type TriggerProps = {
  togglePopover: () => void;
};

export const Trigger = ({ togglePopover }: TriggerProps) => (
  <PopoverTrigger asChild onClick={togglePopover}>
    <div className="flex items-center gap-2 bg-purple-500 p-4 rounded-full focus:outline-none hover:underline-offset-4 ease-in-out duration-200 shadow-lg hover:bg-purple-600 cursor-pointer">
      <Image
        src="https://nextjs.org/icons/vercel.svg"
        alt="Open AI Assistant"
        width={20}
        height={20}
      />
    </div>
  </PopoverTrigger>
);

const SystemMessage = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <Image
      src={AvaPic}
      alt="Avatar Picture"
      width={32}
      height={32}
      className="self-start rounded bg-purple-500 p-1 rounded-full"
    />
    <div className="flex bg-gray-100 py-1 px-3 text-sm rounded-lg rounded-tl-none items-center">
      <p>{text}</p>
    </div>
  </div>
);

type ContentProps = {
  closePopover: () => void;
};

export const Content = ({ closePopover }: ContentProps) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, loading, sendMessage, deleteMessage] = useChatStore(
    (state) => [state.messages, state.loading, state.send, state.delete]
  );

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, chatRef]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && inputRef.current) {
        sendMessage(inputRef.current.value ?? "");
        inputRef.current.value = "";
      }
    });

    return () => {
      document.removeEventListener("keydown", () => {});
    };
  }, [sendMessage, inputRef]);

  return (
    <PopoverContent
      side="top"
      align="end"
      sideOffset={10}
      alignOffset={5}
      className="max-h-[620px] w-[358px]"
    >
      <header className="flex flex-col w-full">
        <button
          onClick={closePopover}
          className="w-6 h-6 p-1 self-end text-gray-600 border-none shadow-none hover:bg-gray-100 hover:text-gray-800 focus:outline-none transition ease-in-out duration-200 rounded-full"
        >
          <XIcon size={16} />
        </button>
        <div className="flex flex-col items-center text-sm gap-2 py-1">
          <Image
            src={AvaPic}
            alt="Ava Picture"
            width={64}
            height={64}
            className="self-center rounded bg-purple-500 p-1 rounded-full"
          />
          <span className="text-md font-bold">Hey 👋, I&apos;m Ava</span>
          <p className="text-gray-500 font-normal">
            Ask me anything or pick a place to start
          </p>
        </div>
      </header>
      <Separator />
      <div
        ref={chatRef}
        className="flex flex-col gap-4 p-4 overflow-y-scroll h-[372px] max-h-[372px]"
      >
        {messages?.map((message) => (
          <DropdownMenu key={message.id}>
            {message.sender === "user" ? (
              <UserMessage
                id={message.id}
                text={message.text}
                edited={message.edited}
                onDelete={() => deleteMessage(message.id)}
              />
            ) : (
              <SystemMessage text={message.text} />
            )}
          </DropdownMenu>
        ))}
      </div>
      <Separator />

      <div className="flex items-center h-center gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type here..."
          className="w-full py-2 px-3 rounded-lg text-gray-600 font-normal focus:outline-none text-sm"
        />
        <button
          type="submit"
          className="bg-transparent border-none shadow-none hover:bg-transparent group"
          onClick={(e) => {
            e.preventDefault();

            if (inputRef.current) {
              sendMessage(inputRef.current.value ?? "");
              inputRef.current.value = "";
            }
          }}
        >
          {!loading ? (
            <PaperPlaneIcon
              fontSize={16}
              className="text-gray-400 group-hover:text-gray-800 ease-linear duration-100"
            />
          ) : (
            <LoaderIcon fontSize={16} className="text-gray-400 animate-spin" />
          )}
        </button>
      </div>
    </PopoverContent>
  );
};
