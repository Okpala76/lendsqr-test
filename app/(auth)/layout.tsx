import { LogoPage } from "@/components/auth/LogoPage";
import styles from "./layout.module.scss";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.gridContainer}>
      <LogoPage />
      {children}
    </main>
  );
}
