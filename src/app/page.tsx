import ThemeToggle from "../components/theme-toggle";
import SettingsDialogButton from "@/components/settings-dialog";
import PageHeader from "@/components/page-header";
import BreakBackground from "../components/break-background";
import TimerCard from "../components/timer/timer-card";
import TaskList from "../components/tasks/task-list";
import { TimerProvider } from "../components/timer-provider";

// "border border-transparent sm:border-red-500 md:border-orange-500 lg:border-yellow-500 xl:border-green-500 2xl:border-blue-500 3xl:border-purple-500"
export default function Home() {
  return (
    <TimerProvider>
      <span className="absolute flex p-6 z-50">
        <ThemeToggle />
        <SettingsDialogButton />
      </span>
      <BreakBackground />
      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-6 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
        <PageHeader />
        <main className="flex flex-col gap-8 row-start-2 items-center w-full md:w-3/4 lg:w-[66%] xl:w-[46%] 2xl:w-[41%] 3xl:w-1/3">
          <TimerCard />
          <TaskList />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          {/* <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a> */}
        </footer>
      </div>
    </TimerProvider>
  );
}
