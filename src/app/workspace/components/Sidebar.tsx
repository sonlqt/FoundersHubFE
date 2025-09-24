'use client';

import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  FolderOpen,
  AlertCircle,
  FileText,
  SidebarClose,
  Video,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' as const },
  { icon: FolderOpen, label: 'Projects', key: 'projects' as const },
  { icon: AlertCircle, label: 'Issues', key: 'issues' as const },
  { icon: Video, label: 'Meetings', key: 'meetings' as const },
  { icon: FileText, label: 'Documents', key: 'documents' as const },
];

interface SidebarProps {
  activeSection: 'dashboard' | 'projects' | 'issues' | 'meetings' | 'documents';
  onSectionChange: (
    section: 'dashboard' | 'projects' | 'issues' | 'meetings' | 'documents'
  ) => void;
}

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://foundershub.nducky.id.vn/api/projects', {
          cache: 'no-store',
        });
        const json = await res.json();
        if (Array.isArray(json?.data)) {
          setProjects(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // 👉 Auto mở submenu nếu đang ở /workspace/project/:id
  useEffect(() => {
    if (pathname?.startsWith('/workspace/project/')) {
      setIsProjectsOpen(true);
    }
  }, [pathname]);

  return (
    <div
      className={`bg-white border-r border-slate-200 flex flex-col h-screen transition-all duration-300 
      ${isCollapsed ? 'w-16' : 'w-52'}`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between m-4">
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

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-slate-100"
        >
          {isCollapsed ? <SidebarClose size={0} /> : <SidebarClose size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isProjectsItem = item.key === 'projects';
            return (
              <div key={item.key}>
                <div
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer
                    ${
                      activeSection === item.key
                        ? 'bg-sky-300 text-slate-700'
                        : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
                    }`}
                >
                  {/* Link tới /workspace/projects */}
                  <Link
                    href={`/workspace/${item.key}`}
                    onClick={() => onSectionChange(item.key)}
                    className="flex items-center gap-3 flex-1"
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>

                  {/* Toggle chỉ cho Projects */}
                  {!isCollapsed && isProjectsItem && (
                    <button
                      type="button"
                      onClick={() => setIsProjectsOpen((prev) => !prev)}
                      className="ml-2 p-1 rounded hover:bg-slate-200"
                    >
                      {isProjectsOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* Sub menu Projects */}
                {isProjectsItem && isProjectsOpen && !isCollapsed && (
                  <div className="ml-8 mt-1 space-y-1 animate-slideDown">
                    {loading && (
                      <p className="text-xs text-slate-400">Loading...</p>
                    )}
                    {!loading &&
                      projects.map((p) => (
                        <Link
                          key={p.id}
                          href={`/workspace/project/${p.id}`}
                          className={`block text-sm rounded px-2 py-1 truncate transition-colors
                            ${
                              pathname === `/workspace/project/${p.id}`
                                ? 'bg-sky-200 text-sky-800'
                                : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
                            }`}
                        >
                          {p.name}
                        </Link>
                      ))}
                    {!loading && projects.length === 0 && (
                      <p className="text-xs text-slate-400">No projects</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
