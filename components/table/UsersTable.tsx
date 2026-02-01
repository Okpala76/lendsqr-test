"use client";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { UsersFilterCard } from "./FilterCard";
import Pagination from "./Pagination";
import RowActionsMenu from "./RowActionsMenu";
import { TableHeader, TableRows, buildTableColumns } from "./TableComponents";
import styles from "./UserTable.module.scss";
import { DEFAULT_FILTERS, FilterDraft, UserRow } from "./types";
import { getGeneratedStatus, includesInsensitive, toYyyyMmDd } from "./utils";
export type { UserRow };

type RowActionMenuState = {
  userId: string;
  anchorRect: DOMRect;
};
export function UsersTable({ users }: { users: UserRow[] }) {
  const [filterDraft, setFilterDraft] = useState<FilterDraft>(DEFAULT_FILTERS);
  const [filterAnchorRect, setFilterAnchorRect] = useState<DOMRect | null>(
    null,
  );
  const [appliedFilters, setAppliedFilters] =
    useState<FilterDraft>(DEFAULT_FILTERS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [rowActionMenu, setRowActionMenu] = useState<RowActionMenuState | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    if (!rowActionMenu) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInsideMenu = target.closest('[data-row-actions-menu="true"]');
      const isActionButton = target.closest('button[aria-label="Row actions"]');

      if (!isInsideMenu && !isActionButton) {
        setRowActionMenu(null);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setRowActionMenu(null);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [rowActionMenu]);
  useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [appliedFilters]);

  // Get unique organizations
  const organizations = useMemo(() => {
    const unique = new Set(users.map((u) => u.organization).filter(Boolean));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [users]);

  // Close filter when clicking outside
  useEffect(() => {
    if (!isFilterOpen) return;

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInsideCard = target.closest('[data-filter-card="true"]');
      const isFilterIcon = target.closest('button[aria-label^="Filter "]');

      if (!isInsideCard && !isFilterIcon) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [isFilterOpen]);

  // Filter users based on applied filters
  const filteredUsers = useMemo(() => {
    const f = appliedFilters;

    const hasAny =
      !!f.organization ||
      !!f.username.trim() ||
      !!f.email.trim() ||
      !!f.phoneNumber.trim() ||
      !!f.date ||
      !!f.status;

    if (!hasAny) return users;

    return users.filter((u) => {
      if (f.organization && u.organization !== f.organization) return false;

      if (
        f.username.trim() &&
        !includesInsensitive(u.username, f.username.trim())
      )
        return false;
      if (f.email.trim() && !includesInsensitive(u.email, f.email.trim()))
        return false;
      if (
        f.phoneNumber.trim() &&
        !includesInsensitive(u.phoneNumber, f.phoneNumber.trim())
      )
        return false;

      if (f.date) {
        const joined = toYyyyMmDd(u.createdAt);
        if (joined !== f.date) return false;
      }

      if (f.status) {
        const generatedStatus = getGeneratedStatus(u.id);
        if (generatedStatus !== f.status) return false;
      }

      return true;
    });
  }, [appliedFilters, users]);

  // Define columns
  const columns = useMemo(() => {
    const openFilterAt = (rect: DOMRect) => {
      setFilterAnchorRect(rect);
      setIsFilterOpen(true);
    };

    const openRowActionsAt = ({
      userId,
      rect,
    }: {
      userId: string;
      rect: DOMRect;
    }) => {
      setRowActionMenu((prev) => {
        // toggle if you click the same row’s button again
        if (prev?.userId === userId) return null;
        return { userId, anchorRect: rect };
      });
    };

    return buildTableColumns(openFilterAt, openRowActionsAt);
  }, []);

  const table = useReactTable({
    data: filteredUsers,
    state: { pagination },
    onPaginationChange: setPagination,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Handler functions
  const applyFilters = () => {
    setAppliedFilters(filterDraft);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilterDraft(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setIsFilterOpen(false);
  };

  function getRowActionsPopupStyle(anchorRect: DOMRect) {
    // design size
    const menuWidth = 180;
    const menuHeight = 130;
    const gap = 8;
    const viewportPadding = 12;

    // default: open below the button, right-aligned to it
    let top = anchorRect.bottom + gap;
    let left = anchorRect.right - menuWidth;

    // keep within viewport horizontally
    const maxLeft = window.innerWidth - menuWidth - viewportPadding;
    left = Math.max(viewportPadding, Math.min(left, maxLeft));

    // if it would go off the bottom, open above the button
    const wouldOverflowBottom =
      top + menuHeight + viewportPadding > window.innerHeight;
    if (wouldOverflowBottom) {
      top = anchorRect.top - menuHeight - gap;
    }

    // keep within viewport vertically
    const maxTop = window.innerHeight - menuHeight - viewportPadding;
    top = Math.max(viewportPadding, Math.min(top, maxTop));

    return { top, left };
  }

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2>Users</h2>
          <p>{filteredUsers.length} users</p>
        </div>

        <div className={styles.relativeContainer}>
          {isFilterOpen && filterAnchorRect ? (
            <div
              className={styles.filterPopup}
              style={{
                top: filterAnchorRect.bottom + 10,
                left: Math.max(16, filterAnchorRect.left - 10),
              }}
            >
              <UsersFilterCard
                organizations={organizations}
                draft={filterDraft}
                onChange={setFilterDraft}
                onReset={resetFilters}
                onApply={applyFilters}
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* Table Section */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <TableHeader headerGroups={table.getHeaderGroups()} />
          <tbody>
            <TableRows
              rows={table.getPaginationRowModel().rows}
              columns={columns}
            />
          </tbody>
        </table>
      </div>
      <Pagination table={table} />
      {rowActionMenu ? (
        <div className={styles.relativeContainer}>
          <div
            className={styles.rowActionsPopup}
            data-row-actions-menu="true"
            style={getRowActionsPopupStyle(rowActionMenu.anchorRect)}
          >
            <RowActionsMenu
              user={filteredUsers.find((u) => u.id === rowActionMenu.userId)!}
              onClose={() => setRowActionMenu(null)}
              onViewDetails={(user) =>
                router.push(`/dashboard/user/${user.id}`)
              }
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
