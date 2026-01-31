"use client";

import type { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import styles from "./UserTable.module.scss";
import type { UserRow } from "./types";

function getPageNumbers(current: number, total: number) {
  // Simple "1 2 3 ... 15 16" style (like your screenshot)
  // Shows: first 3, last 2, and current +/- 1
  const pages = new Set<number>();

  for (let i = 0; i < Math.min(3, total); i++) pages.add(i);
  for (let i = Math.max(total - 2, 0); i < total; i++) pages.add(i);

  pages.add(current);
  pages.add(current - 1);
  pages.add(current + 1);

  const sorted = Array.from(pages)
    .filter((p) => p >= 0 && p < total)
    .sort((a, b) => a - b);

  // Insert "..." markers
  const result: Array<number | "ellipsis"> = [];
  for (let i = 0; i < sorted.length; i++) {
    const p = sorted[i];
    const prev = sorted[i - 1];

    if (i > 0 && prev !== undefined && p - prev > 1) {
      result.push("ellipsis");
    }
    result.push(p);
  }

  return result;
}

export default function Pagination({ table }: { table: Table<UserRow> }) {
  const totalRows = table.getFilteredRowModel().rows.length;

  const { pageIndex, pageSize } = table.getState().pagination;

  const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalRows);

  const pageCount = table.getPageCount();

  const pageItems = useMemo(
    () => getPageNumbers(pageIndex, pageCount),
    [pageIndex, pageCount],
  );

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationInfo}>
        Showing <span className={styles.paginationStrong}>{start}</span>–
        <span className={styles.paginationStrong}>{end}</span> out of{" "}
        <span className={styles.paginationStrong}>{totalRows}</span>
      </div>

      <div className={styles.paginationControls}>
        <button
          type="button"
          className={styles.paginationNavBtn}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous page"
        >
          ‹
        </button>

        <div className={styles.paginationPages}>
          {pageItems.map((item, idx) => {
            if (item === "ellipsis") {
              return (
                <span key={`e-${idx}`} className={styles.paginationEllipsis}>
                  …
                </span>
              );
            }

            const page = item; // 0-based
            const isActive = page === pageIndex;

            return (
              <button
                key={page}
                type="button"
                className={`${styles.paginationPageBtn} ${
                  isActive ? styles.paginationPageBtnActive : ""
                }`}
                onClick={() => table.setPageIndex(page)}
              >
                {page + 1}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={styles.paginationNavBtn}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  );
}
