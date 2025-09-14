'use client';
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Target,
  TrendingUp,
  Clock
} from 'lucide-react';
import mockProjects from '@/app/mock/mockProjects.json';

export const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'On Hold' | 'Completed'>('All');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-300 text-slate-700';
      case 'On Hold': return 'bg-yellow-300 text-slate-700';
      case 'Completed': return 'bg-sky-300 text-slate-700';
      default: return 'bg-slate-300 text-slate-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Projects</h1>
            <p className="text-slate-600">Manage and track all your projects in one place.</p>
          </div>
          <button className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-sky-400"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:border-sky-300 hover:shadow-md transition-all duration-200 cursor-pointer group">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">
                    {project.name}
                  </h3>
                  <span className={`${getStatusColor(project.status)} text-xs px-2 py-1 rounded-full`}>
                    {project.status}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-800">{project.progress}%</div>
                  <div className="text-xs text-slate-500">Complete</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-sky-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-sky-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold text-slate-800">{project.tasksCount.total}</div>
                  <div className="text-xs text-slate-500">Total Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-emerald-600">{project.tasksCount.completed}</div>
                  <div className="text-xs text-slate-500">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-sky-600">{project.tasksCount.inProgress}</div>
                  <div className="text-xs text-slate-500">In Progress</div>
                </div>
              </div>

              {/* Team and Dates */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{project.team}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{formatDate(project.deadline)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={project.lead.avatar}
                      alt={project.lead.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-slate-700">{project.lead.name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-slate-500" />
                    <div className="flex -space-x-1">
                      {project.members.slice(0, 3).map((member) => (
                        <img
                          key={member.id}
                          src={member.avatar}
                          alt={member.name}
                          className="w-5 h-5 rounded-full border border-slate-200"
                          title={member.name}
                        />
                      ))}
                      {project.members.length > 3 && (
                        <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                          <span className="text-xs text-slate-600">+{project.members.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">No projects found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
