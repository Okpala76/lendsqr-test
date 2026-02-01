"use client";

import styles from "./PageTopBar.module.scss";

type PageTopBarProps = {
  title: string;
  onBack: () => void;
  onBlacklist: () => void;
  onActivate: () => void;
};

export function PageTopBar({
  title,
  onBack,
  onBlacklist,
  onActivate,
}: PageTopBarProps) {
  return (
    <div className={styles.topBar}>
      <button type="button" className={styles.backLink} onClick={onBack}>
        ← Back to Users
      </button>

      <div className={styles.titleRow}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.blacklistBtn}
            onClick={onBlacklist}
          >
            BLACKLIST USER
          </button>
          <button
            type="button"
            className={styles.activateBtn}
            onClick={onActivate}
          >
            ACTIVATE USER
          </button>
        </div>
      </div>
    </div>
  );
}
