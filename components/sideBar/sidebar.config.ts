// sidebar-nav.config.ts

export type SidebarNavItem = {
  label: string;
  href: string;
  icon: string;
};

export type SidebarNavSection = {
  title: string;
  items: SidebarNavItem[];
};

export const topItems: SidebarNavItem[] = [
  {
    label: "Switch Organization",
    href: "/organization/switch",
    icon: "/sidebar/briefcase 1.svg",
  },
  { label: "Dashboard", href: "/dashboard", icon: "/sidebar/home 1.svg" },
];

export const sections: SidebarNavSection[] = [
  {
    title: "CUSTOMERS",
    items: [
      {
        label: "Users",
        href: "/customers/users",
        icon: "/sidebar/userFriends 1.svg",
      },
      {
        label: "Guarantors",
        href: "/customers/guarantors",
        icon: "/sidebar/users 1.svg",
      },
      { label: "Loans", href: "/customers/loans", icon: "/sidebar/sack 1.svg" },
      {
        label: "Decision Models",
        href: "/customers/decision-models",
        icon: "/sidebar/handshakeRegular 1.svg",
      },
      {
        label: "Savings",
        href: "/customers/savings",
        icon: "/sidebar/savings.svg",
      },
      {
        label: "Loan Requests",
        href: "/customers/loan-requests",
        icon: "/sidebar/loanRequest.svg",
      },
      {
        label: "Whitelist",
        href: "/customers/whitelist",
        icon: "/sidebar/userCheck 1.svg",
      },
      {
        label: "Karma",
        href: "/customers/karma",
        icon: "/sidebar/userTimes 1.svg",
      },
    ],
  },
  {
    title: "BUSINESSES",
    items: [
      {
        label: "Organization",
        href: "/businesses/organization",
        icon: "/sidebar/briefcase 2.svg",
      },
      {
        label: "Loan Products",
        href: "/businesses/loan-products",
        icon: "/sidebar/loanRequest.svg",
      },
      {
        label: "Savings Products",
        href: "/businesses/savings-products",
        icon: "/sidebar/bank.svg",
      },
      {
        label: "Fees and Charges",
        href: "/businesses/fees-charges",
        icon: "/sidebar/coins-solid 1.svg",
      },
      {
        label: "Transactions",
        href: "/businesses/transactions",
        icon: "/sidebar/transaction.svg",
      },
      {
        label: "Services",
        href: "/businesses/services",
        icon: "/sidebar/galaxy 1.svg",
      },
      {
        label: "Service Account",
        href: "/businesses/service-account",
        icon: "/sidebar/user-cog 1.svg",
      },
      {
        label: "Settlements",
        href: "/businesses/settlements",
        icon: "/sidebar/scroll 1.svg",
      },
      {
        label: "Reports",
        href: "/businesses/reports",
        icon: "/sidebar/chart-bar 2.svg",
      },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      {
        label: "Preferences",
        href: "/settings/preferences",
        icon: "/sidebar/sliders-h 1.svg",
      },
      {
        label: "Fees and Pricing",
        href: "/settings/fees-pricing",
        icon: "/sidebar/badge-percent 1.svg",
      },
      {
        label: "Audit Logs",
        href: "/settings/audit-logs",
        icon: "/sidebar/clipboard-list 1.svg",
      },
    ],
  },
];
