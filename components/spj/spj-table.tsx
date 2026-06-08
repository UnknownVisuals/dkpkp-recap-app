import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface SpjTableProps {
  logs: Array<{
    id: string;
    relatedSpb: string;
    date: string;
    realization: string;
    file: string;
  }>;
}

export function SpjTable({ logs }: SpjTableProps) {
  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold w-37.5">No. SPJ</TableHead>
            <TableHead className="font-bold w-35">No. SPB Terkait</TableHead>
            <TableHead className="font-bold w-27.5">Tanggal</TableHead>
            <TableHead className="font-bold">Total Realisasi</TableHead>
            <TableHead className="font-bold text-right w-35">
              Arsip Berkas
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs leading-normal">
          {logs.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-bold font-mono">{item.id}</TableCell>
              <TableCell className="text-muted-foreground font-mono">
                {item.relatedSpb}
              </TableCell>
              <TableCell className="text-muted-foreground whitespace-nowrap">
                {item.date}
              </TableCell>
              <TableCell className="font-bold">{item.realization}</TableCell>
              <TableCell className="text-right">
                <span className="inline-flex items-center gap-1.5 font-semibold hover:underline">
                  <FileText className="h-3.5 w-3.5" /> {item.file}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
