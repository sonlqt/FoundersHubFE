"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderKanban,
    Settings,
    Bell,
    LogOut,
} from "lucide-react";

const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Notifications", href: "/admin/notifications", icon: Bell },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen bg-white border-r flex flex-col justify-between">
            {/* Top */}
            <div className="p-6">
                {/* Logo / Title */}
                <h1 className="text-xl font-bold mb-8">FoundersHub Admin</h1>

                {/* Menu */}
                <nav className="flex flex-col space-y-2">
                    {menuItems.map((item) => {
                        const isActive =
                            pathname === item.href || pathname.startsWith(item.href + "/");
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${isActive
                                        ? "text-blue-600 bg-blue-50"
                                        : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom User */}
            <div className="p-6 border-t flex items-center gap-3">
                <img
                    src="https://i.pravatar.cc/40"
                    alt="User"
                    className="w-10 h-10 rounded-full border"
                />
                <div className="flex flex-col flex-1">
                    <span className="font-medium text-sm">Nguyen Admin</span>
                    <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500">
                        <LogOut className="w-3 h-3" />
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    );
}
