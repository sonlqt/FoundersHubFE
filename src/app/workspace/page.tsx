'use client';
import { useState } from "react";
import mockTasks  from "../mock/mockTasks.json";
import { Calendar } from "./components/Calendar";
import { Dashboard } from "./components/Dashboard";
import { Issues } from "./components/Issues";
import { KanbanBoard } from "./components/KanbanBoard";
import { Projects } from "./components/Projects";
import { Sidebar } from "./components/Sidebar";
import { TaskDetail } from "./components/TaskDetail";
import { TopBar } from "./components/TopBar";
import { Task } from "@/type/Task";


function page() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeSection, setActiveSection] = useState<'dashboard' | 'projects' | 'issues' | 'boards' | 'calendar'>('boards');

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseTaskDetail = () => {
    setSelectedTask(null);
  };

  const handleSectionChange = (section: 'dashboard' | 'projects' | 'issues' | 'boards' | 'calendar') => {
    setActiveSection(section);
    setSelectedTask(null); // Close task detail when switching sections
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <Projects />;
      case 'issues':
        return <Issues />;
      case 'calendar':
        return <Calendar />;
      case 'boards':
      default:
        return (
          <>
            <div className="flex-1 flex overflow-hidden">
              <KanbanBoard tasks={mockTasks} onTaskClick={handleTaskClick} />
              {selectedTask && (
                <TaskDetail task={selectedTask} onClose={handleCloseTaskDetail} />
              )}
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      <div className="flex-1 flex flex-col">
        <TopBar />
        {renderMainContent()}
      </div>
    </div>
  );
}

export default page;