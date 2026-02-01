"use client";

import styles from "./SummaryCard.module.scss";

type SummaryCardProps = {
  name: string;
  tierLabel: string;
  tierStars: number; // 0..3
  accountBalance: string;
  accountMeta: string;
};

export function SummaryCard({
  name,
  tierLabel,
  tierStars,
  accountBalance,
  accountMeta,
}: SummaryCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.avatarCircle} aria-hidden="true">
          <span className={styles.avatarIcon}>👤</span>
        </div>

        <div className={styles.identity}>
          <div className={styles.name}>{name}</div>
          {/* id excluded as requested */}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.tier}>
        <div className={styles.tierLabel}>{tierLabel}</div>
        <div className={styles.stars} aria-label={`Tier ${tierStars} stars`}>
          {"★".repeat(tierStars)}
          {"☆".repeat(Math.max(0, 3 - tierStars))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.money}>
        <div className={styles.balance}>{accountBalance}</div>
        <div className={styles.meta}>{accountMeta}</div>
      </div>
    </div>
  );
}
