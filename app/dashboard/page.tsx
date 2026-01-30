import { MetricCard } from "@/components/metric-card/MetricCard";
import styles from "./page.module.scss";

export default function UserDashboardPage() {
  const metrics = [
    {
      label: "Users",
      value: "2453",
      iconSrc: "/metric/icon (1).svg",
      iconAlt: "Users",
    },
    {
      label: "Active Users",
      value: "12,453",
      iconSrc: "/metric/icon (2).svg",
      iconAlt: "Loans",
    },
    {
      label: "user with loan",
      value: "102,453",
      iconSrc: "/metric/icon (3).svg",
      iconAlt: "Savings",
    },
    {
      label: "users with savings",
      value: "12,453",
      iconSrc: "/metric/icon (4).svg",
      iconAlt: "Revenue",
    },
  ];
  return (
    <div>
      <div className={styles.header}>
        <text className={styles.text}>Users</text>
      </div>

      <section className={styles.metricsRow}>
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            iconSrc={metric.iconSrc}
            iconAlt={metric.iconAlt}
          />
        ))}
      </section>
    </div>
  );
}
