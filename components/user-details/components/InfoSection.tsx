"use client";

import styles from "./InfoSection.module.scss";

export type InfoItem = {
  label: string;
  value: string;
};

type InfoSectionProps = {
  title: string;
  items: InfoItem[];
};

export function InfoSection({ title, items }: InfoSectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.label} className={styles.item}>
            <div className={styles.label}>{item.label}</div>
            <div className={styles.value}>{item.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
