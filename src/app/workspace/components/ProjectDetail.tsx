'use client';

import React, { useEffect, useState } from 'react';
import { Edit3, Download, Mail, Phone, Calendar, Clock, Users } from 'lucide-react';
import { Project } from '@/type/project';

interface ProjectDetailProps {
  id: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ id }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token'); // nếu API cần auth
        const res = await fetch(`https://foundershub.nducky.id.vn/api/projects/${id}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (!res.ok) {
          console.error('Failed to fetch project:', res.status);
          return;
        }

        const data = await res.json();
        setProject(data?.data || data); // tuỳ API trả về {code, data} hay trực tiếp object
      } catch (err) {
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!project) {
    return <div className="p-6">Project not found</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Title + Status */}
          <div className="items-center gap-3">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900">{project.name}</h1>
              <span className="px-3 py-1 ml-3 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                ● {project.status}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-600">Progress:</span>
              <div className="w-45 bg-gray-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-blue-600">
                {project.progress}%
              </span>
            </div>
          </div>

          {/* Manager */}
          {project.managerId && (
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc"
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-semibold text-gray-900">
                  {project.managerId.fullName}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={14} className="text-blue-600" /> {project.managerId.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} className="text-green-600" /> {project.managerId.phone}
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="flex flex-wrap items-center gap-8 text-sm mt-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs uppercase tracking-wide">Team</span>
                <span className="font-semibold text-slate-800">{project.teamSize ?? "-"}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs uppercase tracking-wide">Start</span>
                <span className="font-semibold text-slate-800">
                  {project.startDate ? new Date(project.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }) : "-"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs uppercase tracking-wide">End</span>
                <span className="font-semibold text-slate-800">
                  {project.endDate ? new Date(project.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }) : "-"}
                </span>
              </div>
            </div>
          </div>


          {/* Actions */}
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              <Edit3 size={14} /> Edit
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
              <Download size={14} /> Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
