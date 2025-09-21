import React from "react";
import { Task } from "@/type/task";

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    : "Chưa có";

  // 🎨 Priority màu
  const priorityClasses: Record<string, string> = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-blue-100 text-blue-700",
    High: "bg-orange-100 text-orange-700",
    Emergency: "bg-red-100 text-red-700 font-bold",
  };


  // 🎨 Status màu
  const statusClasses: Record<string, string> = {
    "To Do": "bg-slate-100 text-slate-600",
    "In Progress": "bg-sky-100 text-sky-700",
    Review: "bg-yellow-100 text-yellow-700",
    Done: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  
  return (
    <div
      onClick={() => onClick(task)}
      className="bg-white border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-sky-300 hover:shadow-md transition-all duration-200 group"
    >
      {/* Priority & Status */}
      <div className="flex items-start justify-between mb-3">
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${priorityClasses[task.priority] || "bg-slate-100 text-slate-600"
            }`}
        >
          {task.priority}
        </span>
        <span
          className={`text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full shadow-sm 
      ${statusClasses[task.status] || "bg-slate-100 text-slate-600"}`}
        >
          {task.status?.toUpperCase()}
        </span>
      </div>

      {/* Task Title */}
      <h3 className="text-sm font-semibold text-slate-800 mb-2 leading-relaxed group-hover:text-sky-600 transition-colors">
        {task.name}
      </h3>

      {/* Task Description */}
      {task.description && (
        <p className="text-xs text-slate-600 mb-3 line-clamp-3">
          {task.description}
        </p>
      )}

      {/* Footer: Due date & created by */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Hạn: {formattedDueDate}</span>
        {task.createdBy?.fullName && (
          <span className="italic">Tạo bởi: {task.createdBy.fullName}</span>
        )}
      </div>
    </div>
  );
};
