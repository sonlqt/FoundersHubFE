import React from 'react';
import { Task } from '@/type/Task';

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <div
      onClick={() => onClick(task)}
      className="bg-white border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-sky-300 hover:shadow-md transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
          {task.code}
        </span>
      </div>
      
      <h3 className="text-sm font-medium text-slate-700 mb-3 leading-relaxed group-hover:text-sky-600 transition-colors">
        {task.title}
      </h3>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">{task.team}</span>
        <img
          src={task.assignee.avatar}
          alt={task.assignee.name}
          className="w-6 h-6 rounded-full ring-2 ring-slate-200 group-hover:ring-sky-300 transition-all"
          title={task.assignee.name}
        />
      </div>
    </div>
  );
};
