import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/sideBar/DashboardSidebar";
import { PropsWithChildren } from "react";

const UserDashboard = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <div className="flex flex-1 ">
          <DashboardSidebar />
          <main className="flex-1 bg-[#FBFBFB] p-8">{children}</main>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
