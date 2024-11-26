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
import { Task } from "./types";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "first task", status: "todo" },
    { id: 2, text: "second task", status: "todo" },
    {
      id: 3,
      text: "third task and this one is super long and i want to see what happens if it's even longer",
      status: "todo",
    },
  ]);

  const setStatus = (id: number, status: string) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  return (
    <Card className="w-full shadow-lg z-0 transition-colors duration-250">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <Button
          className="w-full border-dashed"
          variant="outline"
          onClick={() =>
            setTasks((tasks) => [
              ...tasks,
              { id: Date.now(), text: "new task", status: "" },
            ])
          }
        >
          Click to add task
        </Button>
        {/* <Input
          className="placeholder:italic border-dashed py-2"
          placeholder="add new task . . ."
        /> */}
        <ul className="flex flex-col gap-y-2">
          {tasks.map((task) => (
            <EditableTask
              key={task.id}
              {...task}
              setStatus={setStatus}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default TaskList;
