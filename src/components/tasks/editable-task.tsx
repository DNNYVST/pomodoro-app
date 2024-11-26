import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Square, SquareCheck, Pencil, X } from "lucide-react";
import { Task } from "./types";

interface EditableTaskProps extends Task {
  setStatus: (id: number, status: string) => void;
  deleteTask: (id: number) => void;
}

const EditableTask = ({
  id,
  text,
  status,
  setStatus,
  deleteTask,
}: EditableTaskProps) => {
  const completed = status === "completed";

  return (
    <Card className="items-center">
      <CardContent
        className={`transition-opacity duration-300 p-2 ${
          completed && "opacity-50"
        }`}
      >
        <div className="flex flex-row items-center gap-x-2">
          <Button
            variant="ghost"
            onClick={() =>
              setStatus(id, status === "todo" ? "completed" : "todo")
            }
          >
            {completed ? <SquareCheck /> : <Square />}
          </Button>
          <span
            className={`transition-colors duration-300 decoration-transparent line-through flex w-min flex-1 text-wrap ${
              completed && "decoration-inherit"
            }`}
          >
            {text}
          </span>
          <Button variant="ghost" className="ml-auto" aria-disabled={completed}>
            <Pencil />
          </Button>
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
