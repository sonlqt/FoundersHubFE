"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  Calendar,
  User,
} from "lucide-react";

const navItems = [
  { name: "Dashboard Overview", path: "/partner/dashboard", icon: LayoutDashboard },
  { name: "My Services", path: "/partner/services", icon: Briefcase },
  { name: "Client Orders", path: "/partner/orders", icon: ClipboardList },
  { name: "Meeting Scheduler", path: "/partner/calendar", icon: Calendar },
];

export default function SidebarPartner() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r bg-white flex flex-col justify-between">
      {/* Top Logo + Nav */}
      <div>
        <div className="px-6 py-4 text-xl font-bold text-purple-800 flex items-center space-x-2">
          <span>FoundersHub</span>
        </div>
        <nav className="mt-6 flex flex-col space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.path);

            return (
              <Link key={item.path} href={item.path}>
                <span
                  className={`flex items-center gap-3 px-6 py-3 text-sm cursor-pointer rounded-r-full transition-colors ${
                    active
                      ? "bg-purple-100 text-purple-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" /> {/* bigger icon */}
                  <span>{item.name}</span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom user info */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-3">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-9 h-9 rounded-full border"
          />
          <div className="flex-1">
            <p className="text-sm font-medium">Marketing Partner</p>
            <p className="text-xs text-gray-500">Partner Account</p>
          </div>
          <User className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </aside>
  );
}
