import { ReactNode } from "react";
import SidebarPartner from "./components/SidebarPartner";
import HeaderPartner from "./components/HeaderPartner";

export default function PartnerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <SidebarPartner />


      <div className="flex flex-col flex-1">
        <HeaderPartner />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
