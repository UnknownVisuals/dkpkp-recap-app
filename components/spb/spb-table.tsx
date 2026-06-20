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
import type { SupabaseSpbRow, SpbStatus } from "@/types/spb";

interface SpbTableProps {
  logs: SupabaseSpbRow[];
  isAdmin: boolean;
}

const statusVariant: Record<SpbStatus, "secondary" | "default" | "destructive"> =
  {
    PENDING: "secondary",
    APPROVED: "default",
    REJECTED: "destructive",
  };

const statusLabel: Record<SpbStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export function SpbTable({ logs, isAdmin }: SpbTableProps) {
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
              <TableHead className="font-bold w-35 h-12 px-4">No. SPB</TableHead>
              <TableHead className="font-bold w-27.5 h-12 px-4">Tanggal</TableHead>
              <TableHead className="font-bold w-40 h-12 px-4">Kepada</TableHead>
              <TableHead className="font-bold h-12 px-4">Kegiatan</TableHead>
              <TableHead className="font-bold text-right w-30 h-12 px-4">
                Nominal
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
                  Belum ada data rekapitulasi SPB di database.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((item) => (
                <TableRow key={item.no_spb}>
                  <TableCell className="font-bold font-mono max-w-35 py-3.5 px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">{item.no_spb}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.no_spb}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap py-3.5 px-4">
                    {item.tanggal}
                  </TableCell>
                  <TableCell className="font-semibold max-w-40 py-3.5 px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">{item.kepada}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.kepada}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground wrap-break-word whitespace-normal min-w-30 py-3.5 px-4">
                    {item.kegiatan}
                  </TableCell>
                  <TableCell className="font-bold text-right whitespace-nowrap text-sm py-3.5 px-4">
                    Rp {Number(item.nominal).toLocaleString("id-ID")}
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
                            handleApprove("spb", item.no_spb)
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
                            setRejectTarget({ type: "spb", id: item.no_spb })
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
