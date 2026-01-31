"use client";

import Image from "next/image";
import styles from "./UserTable.module.scss";
import { UserRow } from "./types";

type RowActionsMenuProps = {
  user: UserRow;
  onClose: () => void;
  onViewDetails?: (user: UserRow) => void;
  onBlacklist?: (user: UserRow) => void;
  onActivate?: (user: UserRow) => void;
};

export default function RowActionsMenu({
  user,
  onClose,
  onViewDetails,
  onBlacklist,
  onActivate,
}: RowActionsMenuProps) {
  return (
    <div
      className={styles.rowActionsMenu}
      role="menu"
      aria-label="Row actions menu"
    >
      <button
        type="button"
        className={styles.rowActionsItem}
        role="menuitem"
        onClick={() => {
          onViewDetails?.(user);
          onClose();
        }}
      >
        <Image src="/table/eye.svg" alt="" width={16} height={16} />
        <span>View Details</span>
      </button>

      <button
        type="button"
        className={styles.rowActionsItem}
        role="menuitem"
        onClick={() => {
          onBlacklist?.(user);
          onClose();
        }}
      >
        <Image src="/table/blacklist.svg" alt="" width={16} height={16} />
        <span>Blacklist User</span>
      </button>

      <button
        type="button"
        className={styles.rowActionsItem}
        role="menuitem"
        onClick={() => {
          onActivate?.(user);
          onClose();
        }}
      >
        <Image src="/table/activate.svg" alt="" width={16} height={16} />
        <span>Activate User</span>
      </button>
    </div>
  );
}
