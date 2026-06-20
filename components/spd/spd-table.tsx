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
import type { SupabaseSpdRow } from "@/types/spd";

interface SpdTableProps {
  logs: SupabaseSpdRow[];
}

export function SpdTable({ logs }: SpdTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <TooltipProvider>
        <Table className="min-w-175">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold w-35 h-12 px-4">
                No. SPD
              </TableHead>
              <TableHead className="font-bold w-27.5 h-12 px-4">
                Tanggal
              </TableHead>
              <TableHead className="font-bold w-52 h-12 px-4">
                Kode Rekening
              </TableHead>
              <TableHead className="font-bold text-right w-30 h-12 px-4">
                Nominal
              </TableHead>
              <TableHead className="font-bold w-24 h-12 px-4">
                Tanggal Input
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs leading-normal">
            {logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-12 text-muted-foreground"
                >
                  Belum ada data SPD di database.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((item) => (
                <TableRow key={item.no_spd}>
                  <TableCell className="font-bold font-mono max-w-35 py-3.5 px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">{item.no_spd}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.no_spd}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap py-3.5 px-4">
                    {item.tanggal}
                  </TableCell>
                  <TableCell className="font-mono text-xs py-3.5 px-4">
                    {item.kode_rekening}
                  </TableCell>
                  <TableCell className="font-bold text-right whitespace-nowrap text-sm py-3.5 px-4">
                    Rp {Number(item.nominal).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap py-3.5 px-4">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TooltipProvider>
    </div>
  );
}
