'use client';

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Task } from '@/type/task';
import { TaskDetail } from './components/TaskDetail';
import { KanbanBoard } from './components/KanbanBoard';
import mockTasks from '../mock/mockTasks.json';

type Section = 'dashboard' | 'projects' | 'issues' | 'calendar' | 'meetings' | 'storage' | 'documents';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeSection, setActiveSection] = useState<Section>('dashboard');

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseTaskDetail = () => {
    setSelectedTask(null);
  };

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    setSelectedTask(null); // Đóng TaskDetail khi đổi section
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />

      <div className="flex-1 flex flex-col">
        <TopBar />

        {/* children sẽ được render ở đây */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
