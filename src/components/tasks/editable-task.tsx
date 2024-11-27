"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Square, SquareCheck, Pencil, PencilOff, Save, X } from "lucide-react";
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
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(text);

  const completed = status === "completed";

  return (
    <Card className="items-center">
      <CardContent className="p-2">
        <div className="flex flex-row items-center gap-x-2">
          <Button
            variant="ghost"
            className={`transition-opacity duration-300 ${
              completed && "opacity-50"
            }`}
            onClick={() =>
              setStatus(id, status === "todo" ? "completed" : "todo")
            }
            aria-disabled={editMode}
          >
            {completed ? <SquareCheck /> : <Square />}
          </Button>
          <span className="flex flex-1 text-wrap w-min">
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
                className="bg-card w-full border-dashed"
                placeholder="Edit task . . ."
                autoFocus
              />
            ) : (
              <span
                className={`pl-3 transition-opacity duration-300 border border-transparent ${
                  completed && "opacity-50 line-through"
                }`}
              >
                {text}
              </span>
            )}
          </span>
          {editMode ? (
            <Button
              variant="ghost"
              className="ml-auto transition-opacity duration-300"
              aria-disabled={completed || !editedText.trim()}
              onClick={() => {
                setText(id, editedText.trim());
                setEditMode(false);
              }}
            >
              <Save />
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="ml-auto transition-opacity duration-300"
              aria-disabled={completed}
              onClick={() => setEditMode((editMode) => !editMode)}
            >
              {completed ? <PencilOff /> : <Pencil />}
            </Button>
          )}
          <Button
            variant="ghost"
            className="ml-auto"
            onClick={() => deleteTask(id)}
          >
            <X />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableTask;
