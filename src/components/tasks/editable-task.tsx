"use client";

import { useState, useEffect, useContext, TouchEvent } from "react";
import useSwipeDetection from "@/app/hooks/use-swipe-detection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Square,
  SquareCheckBig,
  Pencil,
  PencilOff,
  Save,
  X,
} from "lucide-react";
import { TimerContext } from "@/components/timer-provider";
import { Task } from "./types";
import { useSortable } from "@dnd-kit/sortable";

interface EditableTaskProps extends Task {
  setStatus: (id: number, status: string) => void;
  setText: (id: number, text: string) => void;
  deleteTask: (id: number) => void;
}

const EditableTask = ({
  id,
  text,
  status,
  setStatus,
  setText,
  deleteTask,
}: EditableTaskProps) => {
  const { running, onBreak } = useContext(TimerContext);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(text);
  const [showMobileControls, setShowMobileControls] = useState<boolean>(false);

  const completed = status === "completed";

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipeDetection({
    onSwipedLeft: () => setShowMobileControls(true),
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: editMode });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${
          isDragging ? 1.05 : 1
        })`
      : undefined,
    zIndex: isDragging ? 100 : "auto",
    transition,
  };

  // abandon in-progress edits if the timer starts
  useEffect(() => {
    if (running) {
      setEditedText(text);
      setEditMode(false);
      setShowMobileControls(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return (
    <Card
      className={`items-center transition-colors duration-300 ${
        running && "border-transparent shadow-none text-transparent"
      } ${onBreak && "bg-transparent"}`}
      ref={setNodeRef}
      style={style}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <CardContent className="p-2 flex relative">
        <div
          className="flex flex-row items-center sm:gap-x-2 w-full"
          onTouchStart={(e) => {
            onTouchStart(e);
            setShowMobileControls(false);
          }}
        >
          <Button
            id={`toggle-task${id}-completed-button`}
            aria-label="toggle task completed button"
            variant="ghost"
            className={`transition-opacity duration-300 ${
              completed && "opacity-50"
            }`}
            onClick={() =>
              setStatus(
                id,
                status === "incomplete" ? "completed" : "incomplete"
              )
            }
            aria-disabled={editMode}
            disabled={running}
          >
            {completed ? <SquareCheckBig /> : <Square />}
            <span className="sr-only">Toggle task completed</span>
          </Button>
          <span className="flex flex-1" {...listeners} {...attributes}>
            {editMode ? (
              <Input
                id={`edit-task${id}-text-input`}
                aria-label="edit-task-text-input"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={(e) => {
                  console.log(e.key);
                  if (e.key === "Enter" && !!editedText.trim()) {
                    setText(id, editedText.trim());
                    setEditMode(false);
                    setShowMobileControls(false);
                  }
                  if (e.key === "Escape") {
                    setEditedText(text);
                    setEditMode(false);
                  }
                }}
                className={`bg-card border-dashed ${
                  showMobileControls && "w-[75%]"
                }`}
                placeholder="Edit task . . ."
                autoFocus
              />
            ) : (
              <span
                className={`break-words pl-3 transition-opacity duration-300 border border-transparent ${
                  completed && "opacity-50 line-through"
                }`}
              >
                {text}
              </span>
            )}
          </span>
          {/* small+ screen edit/delete controls */}
          <span className="flex flex-col sm:flex-row hidden sm:block">
            {editMode ? (
              <Button
                id="save-edited-task-text-button"
                aria-label="save edited task text button"
                variant="ghost"
                onClick={() => {
                  setText(id, editedText.trim());
                  setEditMode(false);
                }}
                aria-disabled={completed || !editedText.trim()}
                disabled={running}
              >
                <Save />
                <span className="sr-only">Save task</span>
              </Button>
            ) : (
              <Button
                id="edit-task-text-button"
                aria-label="edit task text button"
                variant="ghost"
                className="transition-opacity duration-300"
                onClick={() => setEditMode((editMode) => !editMode)}
                aria-disabled={completed}
                disabled={running}
              >
                {completed ? <PencilOff /> : <Pencil />}
                <span className="sr-only">Edit task</span>
              </Button>
            )}
            <Button
              id="delete-task-button"
              aria-label="delete task button"
              variant="ghost"
              className="ml-auto transition-opacity duration-300"
              onClick={() => deleteTask(id)}
              disabled={running}
            >
              <X />
              <span className="sr-only">Delete task</span>
            </Button>
            {/* <Button variant="ghost" {...listeners} {...attributes}>
              <GripVertical />
            </Button> */}
          </span>
        </div>
        {/* smallest screen edit/delete controls */}
        <span
          className={`transition-opacity duration-300 ${
            showMobileControls ? "visible opacity-100" : "invisible opacity-0"
          } sm:hidden flex gap-x-1 bg-card absolute right-1 top-0 bottom-0 py-1`}
        >
          {editMode ? (
            <Button
              id="save-edited-task-text-button"
              aria-label="save edited task text button"
              variant="secondary"
              onClick={() => {
                setText(id, editedText.trim());
                setEditMode(false);
                setShowMobileControls(false);
              }}
              aria-disabled={completed || !editedText.trim()}
              disabled={running}
              className="h-full"
            >
              <Save />
              <span className="sr-only">Save task</span>
            </Button>
          ) : (
            <Button
              id="edit-task-text-button"
              aria-label="edit task text button"
              variant={completed ? "ghost" : "secondary"}
              onClick={() => setEditMode((editMode) => !editMode)}
              aria-disabled={completed}
              disabled={running}
              className="h-full"
            >
              {completed ? <PencilOff /> : <Pencil />}
              <span className="sr-only">Edit task</span>
            </Button>
          )}
          {!editMode && (
            <Button
              id="delete-task-button"
              aria-label="delete task button"
              variant="destructive"
              className="h-full"
              onClick={() => deleteTask(id)}
              disabled={running}
            >
              <X />
              <span className="sr-only">Delete task</span>
            </Button>
          )}
        </span>
      </CardContent>
    </Card>
  );
};

export default EditableTask;
