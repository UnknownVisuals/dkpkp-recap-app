"use client";

import { useState, useMemo } from "react";
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
import { SearchInput } from "@/components/ui/search-input";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import type { SupabaseSpdRow } from "@/types/spd";

interface SpdTableProps {
  logs: SupabaseSpdRow[];
}

type SortableColumn = "no_spd" | "tanggal" | "kode_rekening" | "nominal" | "created_at";

export function SpdTable({ logs }: SpdTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<SortableColumn>("tanggal");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedAndFiltered = useMemo(() => {
    let result = [...logs];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.no_spd.toLowerCase().includes(q) ||
          item.tanggal.toLowerCase().includes(q) ||
          item.kode_rekening.toLowerCase().includes(q) ||
          String(item.nominal).includes(q),
      );
    }

    result.sort((a, b) => {
      let cmp = 0;
      switch (sortColumn) {
        case "no_spd":
          cmp = a.no_spd.localeCompare(b.no_spd);
          break;
        case "tanggal":
          cmp = a.tanggal.localeCompare(b.tanggal);
          break;
        case "kode_rekening":
          cmp = a.kode_rekening.localeCompare(b.kode_rekening);
          break;
        case "nominal":
          cmp = a.nominal - b.nominal;
          break;
        case "created_at":
          cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
      }
      return sortDirection === "asc" ? cmp : -cmp;
    });

    return result;
  }, [logs, searchQuery, sortColumn, sortDirection]);

  function getSortIcon(column: SortableColumn) {
    if (sortColumn !== column)
      return <ArrowUpDown className="h-3 w-3 opacity-30" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-3 w-3" />
    ) : (
      <ArrowDown className="h-3 w-3" />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <TooltipProvider>
        <div className="mb-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari SPD..."
          />
        </div>

        <Table className="min-w-175">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold w-35 h-12 px-4">
                <button
                  onClick={() => handleSort("no_spd")}
                  className="inline-flex items-center gap-1 cursor-pointer select-none"
                >
                  No. SPD
{getSortIcon("no_spd")}
                  </button>
              </TableHead>
              <TableHead className="font-bold w-27.5 h-12 px-4">
                <button
                  onClick={() => handleSort("tanggal")}
                  className="inline-flex items-center gap-1 cursor-pointer select-none"
                >
                  Tanggal
{getSortIcon("tanggal")}
                  </button>
              </TableHead>
              <TableHead className="font-bold w-52 h-12 px-4">
                <button
                  onClick={() => handleSort("kode_rekening")}
                  className="inline-flex items-center gap-1 cursor-pointer select-none"
                >
                  Kode Rekening
{getSortIcon("kode_rekening")}
                  </button>
              </TableHead>
              <TableHead className="font-bold text-right w-30 h-12 px-4">
                <button
                  onClick={() => handleSort("nominal")}
                  className="inline-flex items-center gap-1 cursor-pointer select-none"
                >
                  Nominal
{getSortIcon("nominal")}
                  </button>
              </TableHead>
              <TableHead className="font-bold w-24 h-12 px-4">
                <button
                  onClick={() => handleSort("created_at")}
                  className="inline-flex items-center gap-1 cursor-pointer select-none"
                >
                  Tanggal Input
{getSortIcon("created_at")}
                  </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs leading-normal">
            {sortedAndFiltered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-12 text-muted-foreground"
                >
                  {searchQuery
                    ? "Tidak ada hasil pencarian."
                    : "Belum ada data SPD di database."}
                </TableCell>
              </TableRow>
            ) : (
              sortedAndFiltered.map((item) => (
                <TableRow key={item.id}>
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
                  <TableCell className="text-muted-foreground text-center whitespace-nowrap py-3.5 px-4">
                    {item.tanggal}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-center max-w-52 py-3.5 px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block">{item.kode_rekening}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.kode_rekening}</p>
                      </TooltipContent>
                    </Tooltip>
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
