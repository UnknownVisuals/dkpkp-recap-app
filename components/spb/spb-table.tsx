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

interface SpbTableProps {
  logs: Array<{
    id: string;
    date: string;
    recipient: string;
    amount: string;
    activity: string;
  }>;
}

export function SpbTable({ logs }: SpbTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <TooltipProvider>
        <Table className="min-w-175">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold w-35">No. SPB</TableHead>
              <TableHead className="font-bold w-27.5">Tanggal</TableHead>
              <TableHead className="font-bold w-40">Kepada</TableHead>
              <TableHead className="font-bold">Kegiatan</TableHead>
              <TableHead className="font-bold text-right w-30">
                Nominal
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
                  Belum ada data rekapitulasi SPB di database.
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
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {item.date}
                  </TableCell>
                  <TableCell className="font-semibold max-w-40">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">{item.recipient}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.recipient}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground wrap-break-word whitespace-normal min-w-30">
                    {item.activity}
                  </TableCell>
                  <TableCell className="font-bold text-right whitespace-nowrap text-sm">
                    {item.amount}
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
