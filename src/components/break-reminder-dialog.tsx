"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BreakReminderDialogProps {
  triggerEnabled?: boolean;
  onClickConfirm: () => void;
  onClickDeny: () => void;
  children: ReactNode;
}

const BreakReminderDialog = ({
  triggerEnabled = true,
  onClickConfirm,
  onClickDeny,
  children,
}: BreakReminderDialogProps) => {
  return (
    <>
      <Dialog>
        {triggerEnabled ? (
          <DialogTrigger asChild>{children}</DialogTrigger>
        ) : (
          <>{children}</>
        )}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Not so fast!</DialogTitle>
          </DialogHeader>
          After 4 focus sessions it is highly recommended that you take a longer
          break before continuing.
          <DialogFooter className="flex flex-col gap-4 sm:flex-row sm:gap-2">
            <DialogClose asChild>
              <Button onClick={onClickConfirm}>
                {`Okay - i'll take a break!`}
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={onClickDeny} variant="outline">
                {`I took a break - I promise!`}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BreakReminderDialog;
