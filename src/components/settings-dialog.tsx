"use client";

import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SettingsDialogButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="transition-colors duration-300">
            <Settings />
            <span className="sr-only">Settings</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription className="italic">
              Coming soon!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="sound-effects"
                className="opacity-40"
                aria-disabled
              >
                Sound effects
              </Label>
              <Switch id="sound-effects" checked disabled />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="auto-start-break"
                className="opacity-40"
                aria-disabled
              >
                Auto Start Break
              </Label>
              <Switch id="auto-start-break" disabled />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="auto-start-focus"
                className="opacity-40"
                aria-disabled
              >
                Auto Start Focus
              </Label>
              <Switch id="auto-start-focus" disabled />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingsDialogButton;
