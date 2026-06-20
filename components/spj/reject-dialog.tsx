"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface RejectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reason: string;
  onReasonChange: (reason: string) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export function RejectDialog({
  open,
  onOpenChange,
  reason,
  onReasonChange,
  onConfirm,
  isLoading,
}: RejectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Alasan Penolakan</DialogTitle>
          <DialogDescription>
            Masukkan catatan mengapa dokumen ini ditolak.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="rejectReason" className="text-xs font-bold">
            Catatan Penolakan
          </Label>
          <Textarea
            id="rejectReason"
            value={reason}
            onChange={(e) => onReasonChange(e.target.value)}
            rows={3}
            placeholder="Masukkan alasan penolakan..."
            className="resize-none"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={!reason.trim() || isLoading}
          >
            {isLoading ? "Memproses..." : "Konfirmasi Tolak"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
