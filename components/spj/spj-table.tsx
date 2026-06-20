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
import { RejectDialog } from "@/components/spj/reject-dialog";
import { approveDocument, rejectDocument } from "@/lib/actions/spj";
import type { SupabaseSpjRow, SpjStatus } from "@/types/spj";

interface SpjTableProps {
  logs: SupabaseSpjRow[];
  isAdmin: boolean;
  onRefresh?: () => void;
}

const statusVariant: Record<
  SpjStatus,
  "secondary" | "default" | "destructive"
> = {
  PENDING: "secondary",
  APPROVED: "default",
  REJECTED: "destructive",
};

const statusLabel: Record<SpjStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export function SpjTable({ logs, isAdmin, onRefresh }: SpjTableProps) {
  const router = useRouter();
  const [rejectTarget, setRejectTarget] = useState<{
    type: "spj" | "spb";
    id: string;
  } | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleApprove = async (type: "spj" | "spb", id: string) => {
    setLoadingId(id);
    const result = await approveDocument(type, id);
    setLoadingId(null);
    if (result.success) {
      onRefresh?.();
    } else {
      alert(result.error);
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
      alert(result.error);
    }
  };

  return (
    <TooltipProvider>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <Table className="min-w-175">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-center w-35 h-12 px-4">
                No. SPJ
              </TableHead>
              <TableHead className="font-bold text-center w-37.5 h-12 px-4">
                No. SPB Terkait
              </TableHead>
              <TableHead className="font-bold text-center w-27.5 h-12 px-4">
                Tanggal
              </TableHead>
              <TableHead className="font-bold text-center h-12 px-4">
                Total Realisasi
              </TableHead>
              <TableHead className="font-bold text-center w-60 h-12 px-4">
                Penerima Dana
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
                  Belum ada data rekapitulasi SPJ di database.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((item) => (
                <TableRow key={item.no_spj}>
                  <TableCell className="font-bold font-mono text-center max-w-35 py-3.5 px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">{item.no_spj}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.no_spj}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-center max-w-37.5 py-3.5 px-4">
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
                  <TableCell className="text-muted-foreground text-center whitespace-nowrap py-3.5 px-4">
                    {item.tanggal}
                  </TableCell>
                  <TableCell className="font-bold text-right whitespace-nowrap py-3.5 px-4">
                    Rp {Number(item.realisasi).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-center font-medium max-w-40 py-3.5 px-4">
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
                          onClick={() => handleApprove("spj", item.no_spj)}
                          disabled={loadingId !== null}
                          title="Setujui"
                        >
                          {loadingId === item.no_spj ? (
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
                            setRejectTarget({ type: "spj", id: item.no_spj })
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
                            `/spj?edit=${encodeURIComponent(item.no_spj)}`,
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
    </TooltipProvider>
  );
}
