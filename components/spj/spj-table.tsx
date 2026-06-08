import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { SpjLogItem } from "@/types/spj";

interface SpjTableProps {
  logs: SpjLogItem[];
}

export function SpjTable({ logs }: SpjTableProps) {
  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold w-35">No. SPJ</TableHead>
            <TableHead className="font-bold w-35">No. SPB Terkait</TableHead>
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
                <TableCell className="font-bold font-mono">{item.id}</TableCell>
                <TableCell className="text-muted-foreground font-mono">
                  {item.relatedSpb}
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {item.date}
                </TableCell>
                <TableCell className="font-bold">{item.realization}</TableCell>
                <TableCell className="text-right font-medium">
                  {item.recipient}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
