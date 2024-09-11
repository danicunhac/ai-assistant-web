import Image from "next/image";
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
import { XIcon } from "lucide-react";
import TanjiroPic from "@/images/tanjiro.png";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            Meet Tanjiro, your personal AI assistant.
          </code>
        </div>
      </main>
      <footer className="row-start-3 w-full flex gap-6 flex-wrap items-center justify-end">
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="flex items-center gap-2 bg-white/[.125] p-4 rounded-full hover:underline-offset-4">
              <Image
                className="dark:invert"
                src="https://nextjs.org/icons/vercel.svg"
                alt="Open AI Assistant"
                width={20}
                height={20}
              />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-black">
            <AlertDialogHeader className="flex w-full justify-center">
              <AlertDialogCancel className="rounded-full w-6 h-6 p-1 self-end">
                <XIcon size={16} />
              </AlertDialogCancel>
              <AlertDialogTitle className="flex flex-col items-center text-sm gap-2">
                <Image
                  className="dark:invert self-center"
                  src={TanjiroPic}
                  alt="Tanjiro Picture"
                  width={64}
                  height={64}
                />
                <p>Hey there! I&apos;m Tanjiro, your personal AI assistant.</p>
                <p>Ask me anything!</p>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </footer>
    </div>
  );
}
