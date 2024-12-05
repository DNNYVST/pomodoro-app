import ControlHub from "@/components/control-hub";
import PageHeader from "@/components/page-header";
import BreakBackground from "../components/break-background";
import TimerCard from "../components/timer/timer-card";
import TasksCard from "../components/tasks/tasks-card";
import { TimerProvider } from "../components/timer-provider";

// "border border-transparent sm:border-red-500 md:border-orange-500 lg:border-yellow-500 xl:border-green-500 2xl:border-blue-500 3xl:border-purple-500"
export default function Home() {
  return (
    <TimerProvider>
      <ControlHub />
      <BreakBackground />
      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-4 sm:p-8 pb-20 gap-6 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
        <PageHeader />
        <main className="flex flex-col gap-8 row-start-2 items-center w-full md:w-3/4 lg:w-[66%] xl:w-[46%] 2xl:w-[41%] 3xl:w-1/3">
          <TimerCard />
          <TasksCard />
        </main>
      </div>
    </TimerProvider>
  );
}
