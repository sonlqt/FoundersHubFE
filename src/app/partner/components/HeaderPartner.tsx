"use client";

import Link from "next/link";
import Image from "next/image"; 
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { Bell, Search } from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/partner/dashboard" },
  { name: "Services", path: "/partner/services" },
  { name: "Orders", path: "/partner/orders" },
  { name: "Calendar", path: "/partner/calendar" },
];

const HeaderPartner: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (pathname === path) return true;
    if (pathname.startsWith(path + "/")) return true;
    return false;
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
      {/* Logo + Brand */}
      <div className="flex items-center gap-2">
        <Image
          src="/logoblack.png" 
          alt="FoundersHub Logo"
          width={28}
          height={28}
          className="w-7 h-7"
        />
        <span className="text-lg font-semibold">FoundersHub</span>
      </div>

      {/* Navigation */}
      <nav className="flex space-x-6">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <span
              className={`cursor-pointer text-sm font-medium ${
                isActive(item.path)
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Right-side Icons */}
      <div className="flex items-center space-x-4">
        <Search className="w-5 h-5 text-gray-600 cursor-pointer" />
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
        <img
          src="/profile.jpg"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default HeaderPartner;
