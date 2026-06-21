"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SearchInput } from "@/components/ui/search-input";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import type { BudgetAccount } from "@/types/budget";

interface BudgetTableProps {
  refreshKey: number;
}

type SortableColumn = "kode_rekening" | "nama_rekening" | "anggaran_total";

export function BudgetTable({ refreshKey }: BudgetTableProps) {
  const [accounts, setAccounts] = useState<BudgetAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<SortableColumn>("kode_rekening");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("budget_accounts")
      .select("*")
      .order("kode_rekening", { ascending: true })
      .then(({ data }) => {
        if (data) setAccounts(data as BudgetAccount[]);
        setLoading(false);
      });
  }, [refreshKey]);

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedAndFiltered = useMemo(() => {
    let result = [...accounts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.kode_rekening.toLowerCase().includes(q) ||
          item.nama_rekening.toLowerCase().includes(q) ||
          String(item.anggaran_total).includes(q),
      );
    }

    result.sort((a, b) => {
      let cmp = 0;
      switch (sortColumn) {
        case "kode_rekening":
          cmp = a.kode_rekening.localeCompare(b.kode_rekening);
          break;
        case "nama_rekening":
          cmp = a.nama_rekening.localeCompare(b.nama_rekening);
          break;
        case "anggaran_total":
          cmp = a.anggaran_total - b.anggaran_total;
          break;
      }
      return sortDirection === "asc" ? cmp : -cmp;
    });

    return result;
  }, [accounts, searchQuery, sortColumn, sortDirection]);

  function getSortIcon(column: SortableColumn) {
    if (sortColumn !== column)
      return <ArrowUpDown className="h-3 w-3 opacity-30" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-3 w-3" />
    ) : (
      <ArrowDown className="h-3 w-3" />
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center text-sm text-muted-foreground">
        Memuat data...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="mb-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari rekening..."
        />
      </div>

      <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-center w-48 h-12 px-4">
              <button
                onClick={() => handleSort("kode_rekening")}
                className="inline-flex items-center gap-1 cursor-pointer select-none"
              >
                Kode Rekening
                {getSortIcon("kode_rekening")}
              </button>
            </TableHead>
            <TableHead className="font-bold text-left h-12 px-4">
              <button
                onClick={() => handleSort("nama_rekening")}
                className="inline-flex items-center gap-1 cursor-pointer select-none"
              >
                Nama Rekening
                {getSortIcon("nama_rekening")}
              </button>
            </TableHead>
            <TableHead className="font-bold text-right w-40 h-12 px-4">
              <button
                onClick={() => handleSort("anggaran_total")}
                className="inline-flex items-center gap-1 cursor-pointer select-none"
              >
                Anggaran Total
                {getSortIcon("anggaran_total")}
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs leading-normal">
          {sortedAndFiltered.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center py-12 text-muted-foreground"
              >
                {searchQuery
                  ? "Tidak ada hasil pencarian."
                  : "Belum ada data rekening."}
              </TableCell>
            </TableRow>
          ) : (
            sortedAndFiltered.map((acc) => (
              <TableRow key={acc.kode_rekening}>
                <TableCell className="font-bold font-mono text-center max-w-48 py-3.5 px-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="truncate block">
                        <Badge variant="outline" className="font-mono truncate max-w-full">
                          {acc.kode_rekening}
                        </Badge>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{acc.kode_rekening}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="font-semibold text-left max-w-60 py-3.5 px-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="truncate block">{acc.nama_rekening}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{acc.nama_rekening}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="font-bold text-right whitespace-nowrap text-sm py-3.5 px-4">
                  Rp {Number(acc.anggaran_total).toLocaleString("id-ID")}
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
