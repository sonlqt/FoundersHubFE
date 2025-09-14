import React from 'react';
import { Task } from '@/type/Task';
import { 
  X, 
  Calendar, 
  User, 
  Users, 
  Clock, 
  MessageCircle,
  Send
} from 'lucide-react';

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'To Do': return 'bg-slate-300 text-slate-700';
    case 'In Progress': return 'bg-sky-300 text-slate-700';
    case 'Review': return 'bg-yellow-300 text-slate-700';
    case 'Done': return 'bg-emerald-300 text-slate-700';
    default: return 'bg-slate-300 text-slate-700';
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const TaskDetail: React.FC<TaskDetailProps> = ({ task, onClose }) => {
  return (
    <div className="w-96 bg-white border-l border-slate-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
            {task.code}
          </span>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 p-1 hover:bg-slate-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          {task.title}
        </h2>
        
        {/* Status and Team */}
        <div className="grid grid-cols-2 gap-4 mb-4">
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
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Team
            </label>
            <p className="text-sm text-slate-700 mt-1">{task.team}</p>
          </div>
        </div>

        {/* Assignee and Lead */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide flex items-center">
              <User className="w-3 h-3 mr-1" />
              Assignee
            </label>
            <div className="flex items-center space-x-2 mt-2">
              <img
                src={task.assignee.avatar}
                alt={task.assignee.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-slate-700">{task.assignee.name}</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide flex items-center">
              <Users className="w-3 h-3 mr-1" />
              Lead
            </label>
            <div className="flex items-center space-x-2 mt-2">
              <img
                src={task.lead.avatar}
                alt={task.lead.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-slate-700">{task.lead.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Dates */}
        <div className="p-6 border-b border-slate-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Created
              </span>
              <span className="text-slate-700">{formatDate(task.createdAt)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Updated
              </span>
              <span className="text-slate-700">{formatDate(task.updatedAt)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Deadline
              </span>
              <span className="text-slate-700">{formatDate(task.deadline)}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-sm font-medium text-slate-600 mb-3">Description</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {task.description}
          </p>
        </div>

        {/* Comments */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-slate-600 mb-4 flex items-center">
            <MessageCircle className="w-4 h-4 mr-2" />
            Comments ({task.comments.length})
          </h3>
          
          <div className="space-y-4">
            {task.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="bg-slate-100 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">
                        {comment.user.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <div className="mt-4">
            <div className="flex space-x-3">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                alt="You"
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <textarea
                  placeholder="Add a comment..."
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button className="bg-sky-400 hover:bg-sky-500 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 transition-colors">
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
  );
};
