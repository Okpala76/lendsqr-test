import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/sideBar/DashboardSidebar";
import { PropsWithChildren } from "react";
import styles from "./page.module.scss";

const UserDashboard = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <div className="flex flex-1 ">
          <DashboardSidebar />
          <main className={`flex-1 px-4 py-5 md:px-10 lg:px-40 ${styles.page}`}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
