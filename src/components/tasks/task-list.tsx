"use client";

import { Task } from "./types";
import EditableTask from "./editable-task";

interface TaskListProps {
  tasks: Task[];
  setStatus: (id: number, status: string) => void;
  setText: (id: number, text: string) => void;
  deleteTask: (id: number) => void;
}

const TaskList = ({ tasks, setStatus, setText, deleteTask }: TaskListProps) => {
  return (
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
  );
};

export default TaskList;
