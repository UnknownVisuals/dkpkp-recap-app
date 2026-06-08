import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

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
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold w-35">No. SPB</TableHead>
            <TableHead className="font-bold w-27.5">Tanggal</TableHead>
            <TableHead className="font-bold w-40">Kepada</TableHead>
            <TableHead className="font-bold">Kegiatan</TableHead>
            <TableHead className="font-bold text-right w-30">Nominal</TableHead>
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
                <TableCell className="font-bold font-mono">{item.id}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {item.date}
                </TableCell>
                <TableCell className="font-semibold">
                  {item.recipient}
                </TableCell>
                <TableCell className="text-muted-foreground max-w-75 wrap-break-word">
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
    </Card>
  );
}
