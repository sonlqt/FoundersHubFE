import React from 'react';
import {
    LayoutDashboard,
    FolderOpen,
    AlertCircle,
    Kanban,
    Calendar,
    Users
} from 'lucide-react';
import Image from 'next/image';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' as const },
    { icon: FolderOpen, label: 'Projects', key: 'projects' as const },
    { icon: AlertCircle, label: 'Issues', key: 'issues' as const },
    { icon: Kanban, label: 'Boards', key: 'boards' as const },
    { icon: Calendar, label: 'Calendar', key: 'calendar' as const },
];

interface SidebarProps {
    activeSection: 'dashboard' | 'projects' | 'issues' | 'boards' | 'calendar';
    onSectionChange: (section: 'dashboard' | 'projects' | 'issues' | 'boards' | 'calendar') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
    return (
        <div className="w-50 bg-white border-r border-slate-200 flex flex-col h-screen">
            {/* Logo */}
            <div className="flex items-center m-6">
                <Image src="/globe.svg" alt="Avatar" width={20} height={20} className="rounded-full mr-3" />
                <p className="font-bold text-sm text-slate-700">FoundersHub</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <div className="space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => onSectionChange(item.key)}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left
                                ${activeSection === item.key
                                    ? 'bg-sky-300 text-slate-700'
                                    : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Teams Section (nếu cần bật lại thì thay màu tương tự pastel)
                <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                            Teams
                        </h3>
                        <button className="text-slate-500 hover:text-sky-600">
                            <Users className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-1">
                        {teams.map((team) => (
                            <div
                                key={team.id}
                                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-sky-50 cursor-pointer transition-colors"
                            >
                                <div className={`w-3 h-3 rounded-full ${team.color}`} />
                                <span className="text-slate-600 hover:text-sky-700 text-sm font-medium">
                                    {team.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div> */}
            </nav>
        </div>
    );
};
