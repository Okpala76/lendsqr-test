import Image from "next/image";
import styles from "./MetricCard.module.scss";

type MetricCardProps = {
  label: string; // e.g. "ACTIVE USERS"
  value: string | number; // e.g. 2453
  iconSrc: string; // e.g. "/icons/users.svg"
  iconAlt: string; // e.g. "Users"
};

export function MetricCard({
  label,
  value,
  iconSrc,
  iconAlt,
}: MetricCardProps) {
  return (
    <div className={styles.metricCard}>
      <div className={styles.iconWrapper}>
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={40}
          height={40}
          className={styles.icon}
          priority={false}
        />
      </div>

      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
}
