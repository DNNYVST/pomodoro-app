"use client";

import { useState, useEffect, useContext } from "react";
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

  const completed = status === "completed";

  // abandon in-progress edits if the timer starts
  useEffect(() => {
    if (running) {
      setEditedText(text);
      setEditMode(false);
    }
  }, [running]);

  return (
    <Card
      className={`items-center transition-colors duration-300 ${
        running && "border-transparent shadow-none text-transparent"
      } ${onBreak && "bg-transparent"}`}
    >
      <CardContent className="p-2">
        <div className="flex flex-row items-center gap-x-2">
          <Button
            id={`toggle-task${id}-completed-button`}
            aria-label="toggle task completed button"
            variant="ghost"
            className={`transition-opacity duration-300 ${
              completed && "opacity-50"
            }`}
            onClick={() =>
              setStatus(id, status === "todo" ? "completed" : "todo")
            }
            aria-disabled={editMode}
            disabled={running}
          >
            {completed ? <SquareCheckBig /> : <Square />}
            <span className="sr-only">Toggle task completed</span>
          </Button>
          <span className="flex flex-1">
            {editMode ? (
              <Input
                id={`edit-task${id}-text-input`}
                aria-label="edit-task-text-input"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !!editedText.trim()) {
                    setText(id, editedText.trim());
                    setEditMode(false);
                  }
                  if (e.key === "Escape") {
                    setEditedText(text);
                    setEditMode(false);
                  }
                }}
                className="bg-card border-dashed"
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
          <span className="flex flex-col sm:flex-row">
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
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableTask;
