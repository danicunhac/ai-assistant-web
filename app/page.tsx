"use client";

import { useEffect, useState } from "react";

import { useChatStore } from "@/hooks/chat";

import { Popover } from "@/components/ui/popover";
import { Content, Trigger } from "@/components/Popover";

export default function Home() {
  const [getMessages] = useChatStore((state) => [state.get]);

  const [popoverOpen, togglePopover] = useState(false);

  useEffect(() => {
    // Fetch messages on app start to populate the chat
    getMessages();
  }, [getMessages]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          Click on the bottom right to chat with{" "}
          <strong className="text-purple-500">Ava</strong>
        </div>
      </main>
      <footer className="row-start-3 w-full flex gap-6 flex-wrap items-center justify-end">
        <Popover open={popoverOpen}>
          <Trigger togglePopover={() => togglePopover((prev) => !prev)} />
          <Content closePopover={() => togglePopover((prev) => !prev)} />
        </Popover>
      </footer>
    </div>
  );
}
