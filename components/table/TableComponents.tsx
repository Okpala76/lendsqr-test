import { ColumnDef, flexRender, useReactTable } from "@tanstack/react-table";
import StatusPill from "./StatusPill";
import TableHeaderWithFilter from "./TableHeaderWithFilter";
import styles from "./UserTable.module.scss";
import { UserRow } from "./types";
import { formatJoinedDate, getGeneratedStatus } from "./utils";

// TableHeader Component
function TableHeader({
  headerGroups,
}: {
  headerGroups: ReturnType<ReturnType<typeof useReactTable>["getHeaderGroups"]>;
}) {
  return (
    <thead className={styles.tableHead}>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

// TableRows Component
function TableRows({
  rows,
  columns,
}: {
  rows: ReturnType<ReturnType<typeof useReactTable>["getRowModel"]>["rows"];
  columns: ColumnDef<UserRow>[];
}) {
  if (rows.length === 0) {
    return (
      <tr>
        <td colSpan={columns.length} className={styles.emptyRow}>
          No users match your filters.
        </td>
      </tr>
    );
  }

  return (
    <>
      {rows.map((row) => (
        <tr key={row.id} className={styles.tableBody}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className={styles.tableBody}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

// Column definitions builder
export function buildTableColumns(
  onFilterClick: (rect: DOMRect) => void,
  onRowActionsClick: (args: { userId: string; rect: DOMRect }) => void,
): ColumnDef<UserRow>[] {
  return [
    {
      header: () => (
        <TableHeaderWithFilter
          label="ORGANIZATION"
          onFilterClick={onFilterClick}
        />
      ),
      accessorKey: "organization",
      cell: (info) => <span>{String(info.getValue() ?? "")}</span>,
    },
    {
      header: () => (
        <TableHeaderWithFilter label="USERNAME" onFilterClick={onFilterClick} />
      ),
      accessorKey: "username",
      cell: (info) => <span>{String(info.getValue() ?? "")}</span>,
    },
    {
      header: () => (
        <TableHeaderWithFilter label="EMAIL" onFilterClick={onFilterClick} />
      ),
      accessorKey: "email",
      cell: (info) => <span>{String(info.getValue() ?? "")}</span>,
    },
    {
      header: () => (
        <TableHeaderWithFilter
          label="PHONE NUMBER"
          onFilterClick={onFilterClick}
        />
      ),
      accessorKey: "phoneNumber",
      cell: (info) => <span>{String(info.getValue() ?? "")}</span>,
    },
    {
      header: () => (
        <TableHeaderWithFilter
          label="DATE JOINED"
          onFilterClick={onFilterClick}
        />
      ),
      accessorKey: "createdAt",
      cell: (info) => (
        <span>{formatJoinedDate(String(info.getValue() ?? ""))}</span>
      ),
    },
    {
      header: () => (
        <TableHeaderWithFilter label="STATUS" onFilterClick={onFilterClick} />
      ),
      id: "status",
      cell: ({ row }) => (
        <StatusPill status={getGeneratedStatus(row.original.id)} />
      ),
    },
    {
      header: () => null,
      id: "actions",
      cell: ({ row }) => (
        <button
          type="button"
          className={styles.actionButton}
          aria-label="Row actions"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            onRowActionsClick({ userId: row.original.id, rect });
          }}
        >
          <span>⋮</span>
        </button>
      ),
    },
  ];
}

export { TableHeader, TableRows };
