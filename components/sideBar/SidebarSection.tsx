"use client";

import { SidebarNavSection } from "./sidebar.config";
import { SidebarNavItem } from "./SidebarNavItem";
import styles from "./SidebarSection.module.scss";

type Props = {
  section: SidebarNavSection;
  collapsed?: boolean;
};

export function SidebarSection({ section, collapsed = false }: Props) {
  return (
    <div className={styles.section}>
      {!collapsed && <p className={styles.heading}>{section.title}</p>}

      <ul className={styles.list}>
        {section.items.map((item) => (
          <li key={item.href}>
            <SidebarNavItem
              href={item.href}
              label={item.label}
              icon={item.icon}
              collapsed={collapsed}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
