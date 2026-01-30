"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Aside } from "../ui/Aside";
import { Overlay } from "../ui/Overlay";
import { ToggleButton } from "../ui/ToggleButton";
import styles from "./DashboardSidebar.module.scss";
import { SidebarNavItem } from "./SidebarNavItem";
import { SidebarSection } from "./SidebarSection";
import { sections, topItems } from "./sidebar.config";

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const collapsed = !isOpen;

  return (
    <>
      <Overlay isVisible={isOpen} onClick={() => setIsOpen(false)} />

      <Aside isOpen={isOpen}>
        <div
          className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ""}`}
        >
          <div
            className={`${styles.toggleRow} ${isOpen ? styles.open : styles.close}`}
          >
            <ToggleButton
              isToggled={isOpen}
              onToggle={() => setIsOpen((v) => !v)}
              ariaLabel={isOpen ? "Close sidebar" : "Open sidebar"}
              className={styles.button}
              iconSize={20}
            />
          </div>

          <div className={styles.topNav}>
            <div
              className={`${styles.switchRow} ${collapsed ? styles.switchRowCollapsed : ""}`}
            >
              <SidebarNavItem
                href={topItems[0].href}
                label={topItems[0].label}
                icon={topItems[0].icon}
                collapsed={collapsed}
                isTopItem
              />

              {!collapsed && <ChevronDown className={styles.chevron} />}
            </div>

            <SidebarNavItem
              href={topItems[1].href}
              label={topItems[1].label}
              icon={topItems[1].icon}
              collapsed={collapsed}
              isTopItem
            />
          </div>

          <div className={styles.sections}>
            {sections.map((section) => (
              <SidebarSection
                key={section.title}
                section={section}
                collapsed={collapsed}
              />
            ))}
          </div>
        </div>
      </Aside>
    </>
  );
}
