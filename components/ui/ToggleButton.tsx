import { Menu, X } from "lucide-react";
import * as React from "react";
import styles from "./ToggleButton.module.scss";

export type ToggleButtonProps = {
  isToggled: boolean;
  onToggle: () => void;
  ariaLabel?: string;
  iconClassName?: string;
  iconSize?: number;
  className: string;
};

export const ToggleButton = React.forwardRef<
  HTMLButtonElement,
  ToggleButtonProps
>(
  (
    {
      isToggled,
      onToggle,
      ariaLabel,
      iconClassName,
      iconSize = 24,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${className}`}
        onClick={onToggle}
        aria-label={ariaLabel}
        aria-expanded={isToggled}
        {...props}
      >
        {isToggled ? (
          <X size={iconSize} className={`${styles.button}, ${iconClassName}`} />
        ) : (
          <Menu
            size={iconSize}
            className={`${styles.button}, ${iconClassName}`}
          />
        )}
      </button>
    );
  },
);

ToggleButton.displayName = "ToggleButton";
