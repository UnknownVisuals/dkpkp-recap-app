"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ExternalLink,
  CheckCircle2,
  XCircle,
  Loader2,
  Pencil,
} from "lucide-react";
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
import { ErrorDialog } from "@/components/ui/error-dialog";
import { RejectDialog } from "@/components/spb/reject-dialog";
import { approveDocument, rejectDocument } from "@/lib/actions/spj";
import type { SupabaseSpbRow, SpbStatus } from "@/types/spb";

interface SpbTableProps {
  logs: SupabaseSpbRow[];
  isAdmin: boolean;
  onRefresh?: () => void;
}

const statusVariant: Record<
  SpbStatus,
  "secondary" | "default" | "destructive"
> = {
  PENDING: "secondary",
  APPROVED: "default",
  REJECTED: "destructive",
};

const statusLabel: Record<SpbStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export function SpbTable({ logs, isAdmin, onRefresh }: SpbTableProps) {
  const router = useRouter();
  const [rejectTarget, setRejectTarget] = useState<{
    type: "spj" | "spb";
    id: string;
  } | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorDialog, setErrorDialog] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: "" });

  const handleApprove = async (type: "spj" | "spb", id: string) => {
    setLoadingId(id);
    const result = await approveDocument(type, id);
    setLoadingId(null);
    if (result.success) {
      onRefresh?.();
    } else {
      setErrorDialog({ open: true, message: result.error ?? "Terjadi kesalahan" });
    }
  };

  const handleReject = async () => {
    if (!rejectTarget) return;
    setLoadingId(rejectTarget.id);
    const result = await rejectDocument(
      rejectTarget.type,
      rejectTarget.id,
      rejectReason,
    );
    setLoadingId(null);
    if (result.success) {
      setRejectTarget(null);
      setRejectReason("");
      onRefresh?.();
    } else {
      setErrorDialog({ open: true, message: result.error ?? "Terjadi kesalahan" });
    }
  };

  return (
    <TooltipProvider>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <Table className="min-w-175">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-center w-35 h-12 px-4">
                No. SPB
              </TableHead>
              <TableHead className="font-bold text-center w-27.5 h-12 px-4">
                Tanggal
              </TableHead>
              <TableHead className="font-bold text-center w-40 h-12 px-4">Kepada</TableHead>
              <TableHead className="font-bold text-center h-12 px-4">Kegiatan</TableHead>
              <TableHead className="font-bold text-right w-30 h-12 px-4">
                Nominal
              </TableHead>
              <TableHead className="font-bold text-center w-24 h-12 px-4">Status</TableHead>
              <TableHead className="font-bold text-center w-20 h-12 px-4">File</TableHead>
              <TableHead className="font-bold text-center w-36 h-12 px-4">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs leading-normal">
            {logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-12 text-muted-foreground"
                >
                  Belum ada data rekapitulasi SPB di database.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((item) => (
                <TableRow key={item.no_spb}>
                  <TableCell className="font-bold font-mono text-center max-w-35 py-3.5 px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">{item.no_spb}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.no_spb}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-center whitespace-nowrap py-3.5 px-4">
                    {item.tanggal}
                  </TableCell>
                  <TableCell className="font-semibold text-center max-w-40 py-3.5 px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">{item.kepada}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.kepada}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-center wrap-break-word whitespace-normal min-w-30 py-3.5 px-4">
                    {item.kegiatan}
                  </TableCell>
                  <TableCell className="font-bold text-right whitespace-nowrap text-sm py-3.5 px-4">
                    Rp {Number(item.nominal).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-center py-3.5 px-4">
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
                  <TableCell className="text-center py-3.5 px-4">
                    {item.lampiran_url ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        asChild
                      >
                        <a
                          href={item.lampiran_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center py-3.5 px-4">
                    {isAdmin ? (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleApprove("spb", item.no_spb)}
                          disabled={loadingId !== null}
                          title="Setujui"
                        >
                          {loadingId === item.no_spb ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                          onClick={() =>
                            setRejectTarget({ type: "spb", id: item.no_spb })
                          }
                          disabled={loadingId !== null}
                          title="Tolak"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : item.status === "REJECTED" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        onClick={() =>
                          router.push(
                            `/spb?edit=${encodeURIComponent(item.no_spb)}`,
                          )
                        }
                        title="Perbaiki Dokumen"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <RejectDialog
        open={!!rejectTarget}
        onOpenChange={(open) => {
          if (!open) {
            setRejectTarget(null);
            setRejectReason("");
          }
        }}
        reason={rejectReason}
        onReasonChange={setRejectReason}
        onConfirm={handleReject}
        isLoading={loadingId !== null}
      />

      <ErrorDialog
        open={errorDialog.open}
        onOpenChange={(open) => setErrorDialog({ ...errorDialog, open })}
        title="Gagal Memproses"
        message={errorDialog.message}
      />
    </TooltipProvider>
  );
}
