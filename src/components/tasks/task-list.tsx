"use client";

import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditableTask from "./editable-task";
import { Plus } from "lucide-react";
import { Task } from "./types";
import { TimerContext } from "@/components/timer-provider";
import usePrefersReducedMotion from "@/app/hooks/use-prefers-reduced-motion";

const TaskList = () => {
  const { running, onBreak } = useContext(TimerContext);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "first task", status: "todo" },
    { id: 2, text: "second task", status: "todo" },
    {
      id: 3,
      text: "third task",
      status: "completed",
    },
  ]);

  // abandon in-progress edits if the timer starts
  useEffect(() => {
    if (running) {
      setNewTaskText("");
      document.body.style.overflow = "hidden";
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    } else {
      document.body.style.overflow = "visible";
    }
  }, [running]);

  const addTask = (text: string) => {
    setTasks((tasks) => [...tasks, { id: Date.now(), text, status: "todo" }]);
  };

  const setStatus = (id: number, status: string) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const setText = (id: number, text: string) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, text } : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  return (
    <Card
      id="task-list"
      className={`w-full shadow-lg z-0 transition-colors duration-300 ${
        running && "border-transparent shadow-none text-transparent select-none"
      } ${onBreak && "bg-transparent"}`}
    >
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <ul className="flex flex-col gap-y-2">
          {tasks.map((task) => (
            <EditableTask
              key={task.id}
              {...task}
              setStatus={setStatus}
              setText={setText}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
        <span className="flex gap-x-2">
          <Input
            id="add-new-task-input"
            aria-label="add new task input"
            value={newTaskText}
            className={`border-dashed py-2 text-center transition-opacity duration-300 ${
              running && "!opacity-0"
            }`}
            placeholder="add task"
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !!newTaskText.trim()) {
                addTask(newTaskText.trim());
                setNewTaskText("");
                document?.getElementById("add-new-task-input")?.blur();
                document?.getElementById("task-list")?.scrollIntoView({
                  behavior: prefersReducedMotion ? "auto" : "smooth",
                });
              }
            }}
            disabled={running}
          />
          <Button
            id="add-new-task-button"
            aria-label="add new task button"
            variant="outline"
            className={`w-fit px-6 transition-opacity duration-300 ${
              running && "!opacity-0"
            }`}
            onClick={() => {
              addTask(newTaskText.trim());
              setNewTaskText("");
            }}
            aria-disabled={!newTaskText.trim()}
            disabled={running}
          >
            <Plus />
            <span className="sr-only">Add new task</span>
          </Button>
        </span>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default TaskList;
