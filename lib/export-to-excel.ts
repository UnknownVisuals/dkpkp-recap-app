import * as XLSX from "xlsx";

interface ColumnDef<T> {
  header: string;
  accessor: (row: T) => string | number;
}

export function exportToExcel<T>(
  data: T[],
  columns: ColumnDef<T>[],
  filename: string,
) {
  const rows = data.map((item) => {
    const row: Record<string, string | number> = {};
    for (const col of columns) {
      row[col.header] = col.accessor(item);
    }
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  worksheet["!cols"] = columns.map((_, i) => ({
    wch: Math.max(
      ...rows.map((r) => String(r[columns[i].header] ?? "").length),
      columns[i].header.length,
    ) + 3,
  }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, `${filename}.xlsx`);
}
