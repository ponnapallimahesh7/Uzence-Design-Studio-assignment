import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(col.key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[columns.find(c => c.key === sortKey)!.dataIndex];
    const bVal = b[columns.find(c => c.key === sortKey)!.dataIndex];
    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleRow = (row: T) => {
    let updated: T[];
    if (selectedRows.includes(row)) {
      updated = selectedRows.filter(r => r !== row);
    } else {
      updated = [...selectedRows, row];
    }
    setSelectedRows(updated);
    onRowSelect?.(updated);
  };

  return (
    <div className="w-full overflow-x-auto">
      {loading ? (
        <div className="p-4 text-center">Loading...</div>
      ) : data.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No data available</div>
      ) : (
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              {selectable && <th className="p-2"></th>}
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col)}
                  className={`p-2 text-left cursor-${col.sortable ? "pointer" : "default"}`}
                >
                  {col.title}
                  {sortKey === col.key && (sortOrder === "asc" ? " 🔼" : " 🔽")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr key={row.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                {selectable && (
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => toggleRow(row)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="p-2">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
