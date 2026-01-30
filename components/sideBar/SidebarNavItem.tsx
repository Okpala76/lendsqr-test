"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SidebarNavItem.module.scss";

type Props = {
  href: string;
  label: string;
  icon: string;
  collapsed?: boolean;
  isTopItem?: boolean;
};

export function SidebarNavItem({
  href,
  label,
  icon,
  collapsed = false,
  isTopItem = false,
}: Props) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={[
        styles.link,
        isActive ? styles.active : styles.inactive,
        collapsed ? styles.collapsed : "",
      ].join(" ")}
    >
      <span className={styles.activeBar} />

      <span className={styles.iconWrap}>
        <Image
          src={icon}
          alt="link icon"
          width={16}
          height={16}
          className={styles.icon}
          priority={false}
        />
      </span>

      {!collapsed && (
        <span
          className={[styles.label, isTopItem ? styles.topLabel : ""].join(" ")}
        >
          {label}
        </span>
      )}
    </Link>
  );
}
