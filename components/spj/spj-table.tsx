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
import { SpjLogItem } from "@/types/spj";

interface SpjTableProps {
  logs: SpjLogItem[];
}

export function SpjTable({ logs }: SpjTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <TooltipProvider>
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
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs leading-normal">
            {logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-12 text-muted-foreground"
                >
                  Belum ada data rekapitulasi SPJ di database.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-bold font-mono max-w-35 py-3.5 px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">{item.id}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.id}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono max-w-37.5 py-3.5 px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">
                          {item.relatedSpb}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.relatedSpb}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap py-3.5 px-4">
                    {item.date}
                  </TableCell>
                  <TableCell className="font-bold whitespace-nowrap py-3.5 px-4">
                    {item.realization}
                  </TableCell>
                  <TableCell className="text-right font-medium max-w-40 py-3.5 px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">{item.recipient}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.recipient}</p>
                      </TooltipContent>
                    </Tooltip>
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
