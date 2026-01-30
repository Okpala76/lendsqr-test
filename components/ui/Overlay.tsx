import { forwardRef, ReactNode } from "react";
import styles from "./Overlay.module.scss";

type OverlayProps = {
  isVisible: boolean;
  onClick: () => void;
  className?: string;
  children?: ReactNode;
};

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ isVisible, onClick, className = "", children }, ref) => {
    if (!isVisible) return null;
    return (
      <div
        ref={ref}
        className={`${styles.container} || ${className} `}
        onClick={onClick}
      >
        {children}
      </div>
    );
  },
);

Overlay.displayName = "Overlay";
