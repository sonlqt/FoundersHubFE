'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  Target,
  Clock
} from 'lucide-react';
import { Project } from '@/type/project';
import Link from 'next/link';
import { AddProjectModal } from '@/app/workspace/components/AddProjectModal'; // 👉 import modal

const API_URL = 'https://foundershub.nducky.id.vn/api/projects';

const formatDate = (dateString?: string) => {
  if (!dateString) return '—';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const deriveStatusLabel = (p: Project) => {
  const now = new Date();
  const isPastEnd = p.endDate ? new Date(p.endDate) < now : false;
  if (p.progress >= 100 || isPastEnd) return 'Completed' as const;
  if (String(p.status).toLowerCase() === 'active') return 'Active' as const;
  return 'On Hold' as const;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-emerald-300 text-slate-700';
    case 'On Hold':
      return 'bg-yellow-300 text-slate-700';
    case 'Completed':
      return 'bg-sky-300 text-slate-700';
    default:
      return 'bg-slate-300 text-slate-700';
  }
};

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'On Hold' | 'Completed'>('All');

  // 👉 quản lý modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const data: Project[] = Array.isArray(json?.data) ? json.data : [];
      setProjects(data);
    } catch (e: any) {
      setError(e?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const status = deriveStatusLabel(p);
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.managerId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  return (
    <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Projects</h1>
            <p className="text-slate-600">Manage and track all your projects in one place.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
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

        {/* Loading / Error states */}
        {loading && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">Loading projects…</h3>
            <p className="text-slate-500">Fetching data from API.</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-rose-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-700 mb-2">Failed to load</h3>
            <p className="text-slate-500">{error}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const statusLabel = deriveStatusLabel(project);
                return (
                  <div
                    key={project.id}
                    className="bg-white border border-slate-200 rounded-lg p-6 hover:border-sky-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
                  >
                    <Link href={`/workspace/project/${project.id}`} className="block">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">
                            {project.name}
                          </h3>
                          <span className={`${getStatusColor(statusLabel)} text-xs px-2 py-1 rounded-full`}>
                            {statusLabel}
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
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-sky-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-slate-800">{project.teamSize}</div>
                          <div className="text-xs text-slate-500">Team Size</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-slate-800">{formatDate(project.startDate)}</div>
                          <div className="text-xs text-slate-500">Start</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-slate-800">{formatDate(project.endDate)}</div>
                          <div className="text-xs text-slate-500">End</div>
                        </div>
                      </div>

                      {/* Lead & Dates */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-slate-500" />
                            <span className="text-sm text-slate-600">Manager</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <span className="text-sm text-slate-600">{formatDate(project.endDate)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {project.managerId?.avatarUrl ? (
                              <img
                                src={project.managerId.avatarUrl}
                                alt={project.managerId.fullName}
                                className="w-6 h-6 rounded-full"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-slate-200" />
                            )}
                            <span className="text-sm text-slate-700">{project.managerId?.fullName || '—'}</span>
                          </div>
                          <div className="text-right text-xs text-slate-500">
                            <div>{project.managerId?.email || ''}</div>
                            <div>{project.managerId?.phone || ''}</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">No projects found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </>
        )}

        {/* 👉 Modal Add Project */}
        <AddProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchData}
        />
      </div>
    </div>
  );
};
