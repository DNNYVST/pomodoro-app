"use client";

import { useState } from "react";
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

const TaskList = () => {
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "first task", status: "todo" },
    { id: 2, text: "second task", status: "todo" },
    {
      id: 3,
      text: "third task and this one is super long and i want to see what happens if it's even longer",
      status: "todo",
    },
  ]);

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
    <Card className="w-full shadow-lg z-0">
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
            className="border-dashed py-2 text-center"
            placeholder="add task"
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !!newTaskText.trim()) {
                addTask(newTaskText.trim());
                setNewTaskText("");
              }
            }}
          />
          <Button
            id="add-new-task-button"
            aria-label="add new task button"
            variant="outline"
            className="w-fit px-6 aria-disabled:border-dashed"
            onClick={() => {
              addTask(newTaskText.trim());
              setNewTaskText("");
            }}
            aria-disabled={!newTaskText.trim()}
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
