"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { LoaderIcon, XIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

import { useChatStore } from "@/hooks/chat";

import AvaPic from "@/images/ava.png";

const UserMessage = ({ text }: { text: string }) => (
  <div className="flex gap-2 justify-end max-w-1/2">
    <div className="py-1 px-3 rounded-lg rounded-tr-none text-white bg-purple-500 items-center">
      <p>{text}</p>
    </div>
  </div>
);

const SystemMessage = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <Image
      src={AvaPic}
      alt="Avatar Picture"
      width={48}
      height={48}
      className="self-start rounded bg-purple-500 p-1 rounded-full"
    />
    <div className="flex bg-gray-100 py-1 px-3 rounded-lg rounded-tl-none items-center">
      <p>{text}</p>
    </div>
  </div>
);

export default function Home() {
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, loading, get, send] = useChatStore((state) => [
    state.messages,
    state.loading,
    state.get,
    state.send,
  ]);

  useEffect(() => {
    get();
  }, [get]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          Click on the bottom right to chat with{" "}
          <strong className="text-purple-500">Ava</strong>
        </div>
      </main>
      <footer className="row-start-3 w-full flex gap-6 flex-wrap items-center justify-end">
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="flex items-center gap-2 bg-purple-500 p-4 rounded-full hover:underline-offset-4 ease-in-out duration-200 shadow-lg hover:bg-purple-600 cursor-pointer">
              <Image
                src="https://nextjs.org/icons/vercel.svg"
                alt="Open AI Assistant"
                width={20}
                height={20}
              />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white h-[95%] md:w-full">
            <AlertDialogHeader className="flex w-full justify-center space-">
              <AlertDialogCancel className="rounded-full w-6 h-6 p-1 self-end">
                <XIcon size={16} />
              </AlertDialogCancel>
              <AlertDialogTitle className="flex flex-col items-center text-sm gap-2">
                <Image
                  src={AvaPic}
                  alt="Ava Picture"
                  width={64}
                  height={64}
                  className="self-center rounded bg-purple-500 p-1 rounded-full"
                />
                <strong className="text-md">Hey 👋, I&apos;m Ava</strong>
                <p className="text-gray-500 font-normal">
                  Ask me anything or pick a place to start
                </p>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div
              ref={chatRef}
              className="flex flex-col gap-4 p-4 overflow-y-scroll h-100"
            >
              {messages.map((message) => (
                <div key={message.id}>
                  {message.sender === "user" ? (
                    <UserMessage text={message.text} />
                  ) : (
                    <SystemMessage text={message.text} />
                  )}
                </div>
              ))}
            </div>
            <Separator />
            <AlertDialogFooter className="flex flex-row items-center rounded py-1 px-3">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type here..."
                className="w-full py-2 px-3 rounded-lg text-gray-600 font-normal focus:outline-none"
              />
              <AlertDialogAction
                type="submit"
                className="bg-transparent border-none shadow-none hover:bg-transparent group"
                onClick={(e) => {
                  e.preventDefault();

                  if (inputRef.current) {
                    send(inputRef.current.value ?? "");
                    inputRef.current.value = "";
                  }
                }}
              >
                {!loading ? (
                  <PaperPlaneIcon className="w-6 h-6 text-gray-400 group-hover:text-gray-800 ease-linear duration-100" />
                ) : (
                  <LoaderIcon className="w-6 h-6 text-gray-400 animate-spin" />
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </footer>
    </div>
  );
}
