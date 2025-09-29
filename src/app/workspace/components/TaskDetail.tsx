'use client';
import React, { useEffect, useState } from 'react';
import {
  X,
  MessageCircle,
  Send,
  AlertTriangle,
} from 'lucide-react';
import { Task } from '@/type/task';

// 🔹 Comment response từ BE
interface TaskComment {
  id: string;
  userId: string;
  userName: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
}

interface TaskDetailProps {
  task: Task | null;
  onClose: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'To Do': return 'bg-slate-200 text-slate-700';
    case 'In Progress': return 'bg-sky-200 text-slate-700';
    case 'Review': return 'bg-yellow-200 text-slate-700';
    case 'Done': return 'bg-emerald-200 text-slate-700';
    case 'Cancelled': return 'bg-red-200 text-slate-700';
    default: return 'bg-slate-200 text-slate-700';
  }
};

const getPriorityColor = (priority: string) => {
  const p = priority?.toLowerCase?.() || '';
  switch (p) {
    case 'low': return 'bg-green-200 text-green-800';
    case 'medium': return 'bg-yellow-200 text-yellow-800';
    case 'high': return 'bg-red-200 text-red-800';
    case 'emergency': return 'bg-red-500 text-white';
    default: return 'bg-gray-200 text-gray-800';
  }
};

export const TaskDetail: React.FC<TaskDetailProps> = ({ task, onClose }) => {
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [newComment, setNewComment] = useState('');

  if (!task) return null;

  // 🔹 Load comments khi mở task
  useEffect(() => {
    if (!task) return;

    const fetchComments = async () => {
      try {
        const res = await fetch(`https://foundershub.nducky.id.vn/api/${task.id}/comments`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        setComments(data.data || []);
      } catch (err) {
        console.error("Failed to fetch comments", err);
       }
    };

    fetchComments();
  }, [task]);

  // 🔹 Gửi comment mới
  const handleSendComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`https://foundershub.nducky.id.vn/api/${task.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content: newComment }),
      });

      const data = await res.json();

      if (res.ok) {
        setComments((prev) => [...prev, data.data]);
        setNewComment('');
      }
    } catch (err) {
      console.error("Failed to send comment", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">{task.name}</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 p-1 hover:bg-slate-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-5 border-b border-slate-200 grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Status
                </label>
                <div className="mt-1">
                  <span className={`${getStatusColor(task.status)} text-xs px-2 py-1 rounded-full`}>
                    {task.status}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Priority
                </label>
                <div className="mt-1">
                  <span className={`${getPriorityColor(task.priority)} text-xs px-2 py-1 rounded-full`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 border-b border-slate-200">
              <h3 className="text-sm font-medium text-slate-600 mb-2">Description</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {task.description || "No description"}
              </p>
            </div>

            {/* Created By */}
            <div className="p-5 border-b border-slate-200">
              <h3 className="text-sm font-medium text-slate-600 mb-2">Created By</h3>
              <div className="flex items-center gap-2">
                <img
                  src={task.createdBy?.avatarUrl ?? "/default-avatar.png"}
                  alt={task.createdBy?.fullName ?? "Unknown"}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-slate-700">
                  {task.createdBy?.fullName ?? "Unknown User"}
                </span>
              </div>
            </div>
          </div>

          {/* Right - Comments */}
          <div className="w-[340px] border-l border-slate-200 flex flex-col">
            <div className="p-5 border-b border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Comments
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="flex items-start gap-3">
                  <img
                    src={c.avatarUrl ?? "/default-avatar.png"}
                    alt={c.userName}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 bg-slate-100 rounded-lg px-3 py-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-800 text-sm">{c.userName}</span>
                      <span className="text-xs text-slate-500">
                        {new Date(c.createdAt).toLocaleString("en-US")}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mt-1">{c.content}</p>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-sm text-slate-500 text-center">No comments yet</p>
              )}
            </div>

            {/* Add comment */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex gap-3">
                <img
                  src={task.createdBy?.avatarUrl ?? "/default-avatar.png"}
                  alt={task.createdBy?.fullName ?? "Unknown"}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700"
                    rows={2}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleSendComment}
                      className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
