"use client";

import styles from "./Tabs.module.scss";

export type UserDetailsTabKey =
  | "general"
  | "documents"
  | "bank"
  | "loans"
  | "savings"
  | "system";

type TabItem = { key: UserDetailsTabKey; label: string };

const tabs: TabItem[] = [
  { key: "general", label: "General Details" },
  { key: "documents", label: "Documents" },
  { key: "bank", label: "Bank Details" },
  { key: "loans", label: "Loans" },
  { key: "savings", label: "Savings" },
  { key: "system", label: "App and System" },
];

type TabsProps = {
  activeTab: UserDetailsTabKey;
  onChange: (key: UserDetailsTabKey) => void;
};

export function Tabs({ activeTab, onChange }: TabsProps) {
  return (
    <div className={styles.tabs}>
      {tabs.map((t) => {
        const isActive = t.key === activeTab;
        return (
          <button
            key={t.key}
            type="button"
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            onClick={() => onChange(t.key)}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
