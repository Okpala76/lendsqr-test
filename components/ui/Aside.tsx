import { forwardRef, ReactNode } from "react";
import styles from "./Aside.module.scss";

type AsideProps = {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
};

export const Aside = forwardRef<HTMLDivElement, AsideProps>(
  ({ isOpen, className = "", children }, ref) => {
    return (
      <aside
        ref={ref}
        className={`${styles.container} ${className}
          ${isOpen ? styles.open : styles.close}
        `}
        style={{ zIndex: 40 }}
      >
        {children}
      </aside>
    );
  },
);

Aside.displayName = "Aside";
