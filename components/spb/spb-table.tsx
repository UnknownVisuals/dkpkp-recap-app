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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <TooltipProvider>
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
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs leading-normal">
            {logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-12 text-muted-foreground"
                >
                  Belum ada data rekapitulasi SPB di database.
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
                  <TableCell className="text-muted-foreground whitespace-nowrap py-3.5 px-4">
                    {item.date}
                  </TableCell>
                  <TableCell className="font-semibold max-w-40 py-3.5 px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">{item.recipient}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.recipient}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground wrap-break-word whitespace-normal min-w-30 py-3.5 px-4">
                    {item.activity}
                  </TableCell>
                  <TableCell className="font-bold text-right whitespace-nowrap text-sm py-3.5 px-4">
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
