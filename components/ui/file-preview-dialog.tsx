"use client";

import { FileIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FilePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  fileName?: string;
}

function isImage(url: string) {
  return /\.(png|jpe?g|gif|webp|svg|bmp|tiff?)$/i.test(url);
}

function isPdf(url: string) {
  return /\.pdf$/i.test(url);
}

export function FilePreviewDialog({
  open,
  onOpenChange,
  url,
  fileName,
}: FilePreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <FileIcon className="h-4 w-4" />
            {fileName ?? "Preview Dokumen"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center overflow-auto max-h-[70vh] rounded-lg bg-slate-100 p-2">
          {isImage(url) ? (
            <img
              src={url}
              alt={fileName ?? "Preview"}
              className="max-w-full max-h-[65vh] object-contain rounded-md"
            />
          ) : isPdf(url) ? (
            <iframe
              src={url}
              className="w-full h-[65vh] rounded-md"
              title={fileName ?? "PDF Preview"}
            />
          ) : (
            <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
              <FileIcon className="h-12 w-12" />
              <p className="text-sm font-medium">Tidak dapat menampilkan pratinjau</p>
              <Button variant="outline" size="sm" asChild>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Buka di Tab Baru
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
