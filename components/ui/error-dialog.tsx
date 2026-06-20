"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: string;
}

export function ErrorDialog({
  open,
  onOpenChange,
  title = "Error",
  message,
}: ErrorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-destructive shrink-0" />
            <DialogTitle className="text-destructive">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-base pt-3">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
