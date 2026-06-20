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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <TooltipProvider>
        <Table className="min-w-175">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold w-35">No. SPJ</TableHead>
              <TableHead className="font-bold w-37.5">
                No. SPB Terkait
              </TableHead>
              <TableHead className="font-bold w-27.5">Tanggal</TableHead>
              <TableHead className="font-bold">Total Realisasi</TableHead>
              <TableHead className="font-bold text-right w-40">
                Penerima Dana
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs leading-normal">
            {logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  Belum ada data rekapitulasi SPJ di database.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-bold font-mono max-w-35">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">{item.id}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.id}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono max-w-37.5">
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
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {item.date}
                  </TableCell>
                  <TableCell className="font-bold whitespace-nowrap">
                    {item.realization}
                  </TableCell>
                  <TableCell className="text-right font-medium max-w-40">
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
