'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  FolderOpen,
  AlertCircle,
  Calendar,
  HardDrive,
  FileText,
  SidebarClose,
  Video
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' as const },
  { icon: FolderOpen, label: 'Projects', key: 'projects' as const },
  { icon: AlertCircle, label: 'Issues', key: 'issues' as const },
  // { icon: Calendar, label: 'Calendar', key: 'calendar' as const },
  { icon: Video, label: 'Meetings', key: 'meetings' as const },   // ✅ mới
  // { icon: HardDrive, label: 'Storage', key: 'storage' as const },
  { icon: FileText, label: 'Documents', key: 'documents' as const },
];

interface SidebarProps {
  activeSection:
    | 'dashboard'
    | 'projects'
    | 'issues'
    // | 'calendar'
    | 'meetings'
    // | 'storage'
    | 'documents';
  onSectionChange: (
    section:
      | 'dashboard'
      | 'projects'
      | 'issues'
      // | 'calendar'
      | 'meetings'
      // | 'storage'
      | 'documents'
  ) => void;
}

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`bg-white border-r border-slate-200 flex flex-col h-screen transition-all duration-300 
      ${isCollapsed ? 'w-16' : 'w-52'}`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between m-4">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer rounded px-2 py-1
             hover:bg-slate-200 hover:text-slate-900 transition-colors"
          onClick={() => {
            if (isCollapsed) setIsCollapsed(false);
          }}
        >
          <Image
            src="/globe.svg"
            alt="Avatar"
            width={20}
            height={20}
            className="flex-shrink-0"
          />
          {!isCollapsed && (
            <p className="font-bold text-sm text-slate-700">FoundersHub</p>
          )}
        </div>

        {/* Button toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-slate-100"
        >
          {isCollapsed ? <SidebarClose size={0} /> : <SidebarClose size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              href={`/workspace/${item.key}`}
              key={item.label}
              onClick={() => onSectionChange(item.key)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full
                ${
                  activeSection === item.key
                    ? 'bg-sky-300 text-slate-700'
                    : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
                }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};
