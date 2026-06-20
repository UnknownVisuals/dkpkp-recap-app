"use client";

import { useState } from "react";
import { ExternalLink, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { approveDocument, rejectDocument } from "@/lib/actions/spj";
import type { SupabaseSpjRow, SpjStatus } from "@/types/spj";

interface SpjTableProps {
  logs: SupabaseSpjRow[];
  isAdmin: boolean;
}

const statusVariant: Record<SpjStatus, "secondary" | "default" | "destructive"> =
  {
    PENDING: "secondary",
    APPROVED: "default",
    REJECTED: "destructive",
  };

const statusLabel: Record<SpjStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export function SpjTable({ logs, isAdmin }: SpjTableProps) {
  const [rejectTarget, setRejectTarget] = useState<{
    type: "spj" | "spb";
    id: string;
  } | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = async (type: "spj" | "spb", id: string) => {
    const result = await approveDocument(type, id);
    if (!result.success) alert(result.error);
  };

  const handleReject = async () => {
    if (!rejectTarget) return;
    const result = await rejectDocument(
      rejectTarget.type,
      rejectTarget.id,
      rejectReason,
    );
    if (result.success) {
      setRejectTarget(null);
      setRejectReason("");
    } else {
      alert(result.error);
    }
  };

  return (
    <TooltipProvider>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <Table className="min-w-175">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold w-35 h-12 px-4">
                No. SPJ
              </TableHead>
              <TableHead className="font-bold w-37.5 h-12 px-4">
                No. SPB Terkait
              </TableHead>
              <TableHead className="font-bold w-27.5 h-12 px-4">
                Tanggal
              </TableHead>
              <TableHead className="font-bold h-12 px-4">
                Total Realisasi
              </TableHead>
              <TableHead className="font-bold text-right w-60 h-12 px-4">
                Penerima Dana
              </TableHead>
              <TableHead className="font-bold w-24 h-12 px-4">Status</TableHead>
              <TableHead className="font-bold w-20 h-12 px-4">File</TableHead>
              {isAdmin && (
                <TableHead className="font-bold w-36 h-12 px-4">Aksi</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs leading-normal">
            {logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={isAdmin ? 8 : 7}
                  className="text-center py-12 text-muted-foreground"
                >
                  Belum ada data rekapitulasi SPJ di database.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((item) => (
                <TableRow key={item.no_spj}>
                  <TableCell className="font-bold font-mono max-w-35 py-3.5 px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">{item.no_spj}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.no_spj}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono max-w-37.5 py-3.5 px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">
                          {item.related_spb}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.related_spb}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap py-3.5 px-4">
                    {item.tanggal}
                  </TableCell>
                  <TableCell className="font-bold whitespace-nowrap py-3.5 px-4">
                    Rp {Number(item.realisasi).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right font-medium max-w-40 py-3.5 px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">
                          {item.nama_penerima}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.nama_penerima}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="py-3.5 px-4">
                    <Tooltip
                      open={
                        item.status === "REJECTED" && !!item.catatan_penolakan
                          ? undefined
                          : false
                      }
                    >
                      <TooltipTrigger asChild>
                        <Badge variant={statusVariant[item.status]}>
                          {statusLabel[item.status]}
                        </Badge>
                      </TooltipTrigger>
                      {item.status === "REJECTED" && item.catatan_penolakan && (
                        <TooltipContent>
                          <p className="max-w-xs">{item.catatan_penolakan}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TableCell>
                  <TableCell className="py-3.5 px-4">
                    {item.lampiran_url ? (
                      <a
                        href={item.lampiran_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  {isAdmin && (
                    <TableCell className="py-3.5 px-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() =>
                            handleApprove("spj", item.no_spj)
                          }
                          title="Setujui"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                          onClick={() =>
                            setRejectTarget({ type: "spj", id: item.no_spj })
                          }
                          title="Tolak"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!rejectTarget}
        onOpenChange={(open) => {
          if (!open) {
            setRejectTarget(null);
            setRejectReason("");
          }
        }}
      >
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
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              placeholder="Masukkan alasan penolakan..."
              className="resize-none"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRejectTarget(null);
                setRejectReason("");
              }}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectReason.trim()}
            >
              Konfirmasi Tolak
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
