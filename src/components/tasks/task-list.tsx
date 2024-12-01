"use client";

import { Dispatch, SetStateAction } from "react";
import { Task } from "./types";
import EditableTask from "./editable-task";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";

interface TaskListProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setStatus: (id: number, status: string) => void;
  setText: (id: number, text: string) => void;
  deleteTask: (id: number) => void;
}

const TaskList = ({
  tasks,
  setTasks,
  setStatus,
  setText,
  deleteTask,
}: TaskListProps) => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 0,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over?.id);
        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
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
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;
