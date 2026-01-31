"use client";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { UsersFilterCard } from "./FilterCard";
import Pagination from "./Pagination";
import { TableHeader, TableRows, buildTableColumns } from "./TableComponents";
import styles from "./UserTable.module.scss";
import { DEFAULT_FILTERS, FilterDraft, UserRow } from "./types";
import { getGeneratedStatus, includesInsensitive, toYyyyMmDd } from "./utils";

export type { UserRow };

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

    return buildTableColumns(openFilterAt);
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
    </div>
  );
}
