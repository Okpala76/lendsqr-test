"use client";

import { useUserById } from "@/hooks/useMockdata";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "./UserDetailsPage.module.scss";
import { InfoItem, InfoSection } from "./components/InfoSection";
import { PageTopBar } from "./components/PageTopBar";
import { SummaryCard } from "./components/SummaryCard";
import { Tabs, UserDetailsTabKey } from "./components/Tabs";

type UserDetailsPageProps = {
  userId: string;
};

export function UserDetailsPage({ userId }: UserDetailsPageProps) {
  const router = useRouter();
  const { data, isLoading, error } = useUserById(userId);

  const [activeTab, setActiveTab] = useState<UserDetailsTabKey>("general");

  // Hardcoded (static) data as requested
  const staticSummary = useMemo(() => {
    return {
      tierLabel: "User’s Tier",
      tierStars: 3,
      accountBalance: "₦200,000.00",
      accountMeta: "9912345678/Providus Bank",
    };
  }, []);

  const generalSections = useMemo(() => {
    const personalInfo: InfoItem[] = [
      { label: "FULL NAME", value: data?.username ?? "—" },
      { label: "PHONE NUMBER", value: data?.phoneNumber ?? "—" },
      { label: "EMAIL ADDRESS", value: data?.email ?? "—" },
      { label: "BVN", value: "07060780922" },
      { label: "GENDER", value: "Female" },
      { label: "MARITAL STATUS", value: "Single" },
      { label: "CHILDREN", value: "None" },
      { label: "TYPE OF RESIDENCE", value: "Parent’s Apartment" },
    ];

    const educationEmployment: InfoItem[] = [
      { label: "LEVEL OF EDUCATION", value: "B.Sc" },
      { label: "EMPLOYMENT STATUS", value: "Employed" },
      { label: "SECTOR OF EMPLOYMENT", value: "FinTech" },
      { label: "DURATION OF EMPLOYMENT", value: "2 years" }, // requested
      { label: "OFFICE EMAIL", value: "grace@lendsqr.com" },
      { label: "MONTHLY INCOME", value: "₦200,000.00 - ₦400,000.00" },
      { label: "LOAN REPAYMENT", value: "40,000" },
    ];

    const socials: InfoItem[] = [
      { label: "TWITTER", value: "@grace_effiom" },
      { label: "FACEBOOK", value: "Grace Effiom" },
      { label: "INSTAGRAM", value: "@grace_effiom" },
    ];

    const guarantor: InfoItem[] = [
      { label: "FULL NAME", value: "Debby Ogana" },
      { label: "PHONE NUMBER", value: "07060780922" },
      { label: "EMAIL ADDRESS", value: "debby@gmail.com" },
      { label: "RELATIONSHIP", value: "Sister" },
    ];

    return { personalInfo, educationEmployment, socials, guarantor };
  }, [data?.email, data?.phoneNumber, data?.username]);

  if (isLoading) return <p className={styles.stateText}>Loading user…</p>;
  if (error || !data)
    return <p className={styles.stateText}>Failed to load user.</p>;

  return (
    <div className={styles.page}>
      <PageTopBar
        title="User Details"
        onBack={() => router.push("/dashboard")}
        onBlacklist={() => console.log("blacklist")}
        onActivate={() => console.log("activate")}
      />

      <SummaryCard
        name={data.username}
        // you said exclude id from UI, so we don't show it
        tierLabel={staticSummary.tierLabel}
        tierStars={staticSummary.tierStars}
        accountBalance={staticSummary.accountBalance}
        accountMeta={staticSummary.accountMeta}
      />

      <Tabs activeTab={activeTab} onChange={setActiveTab} />

      <div className={styles.tabContent}>
        {activeTab === "general" ? (
          <>
            <InfoSection
              title="Personal Information"
              items={generalSections.personalInfo}
            />
            <InfoSection
              title="Education and Employment"
              items={generalSections.educationEmployment}
            />
            <InfoSection title="Socials" items={generalSections.socials} />
            <InfoSection title="Guarantor" items={generalSections.guarantor} />
          </>
        ) : (
          <div className={styles.placeholder}>
            {/* Tabs clickable, but only General shows content (as requested) */}
          </div>
        )}
      </div>
    </div>
  );
}
