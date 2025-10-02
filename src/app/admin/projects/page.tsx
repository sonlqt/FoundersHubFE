"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthlyProjects = [
  { month: "Jan", created: 60 },
  { month: "Feb", created: 80 },
  { month: "Mar", created: 120 },
  { month: "Apr", created: 180 },
];

const recentProjects = [
  {
    title: "AI Chatbot Integration for SMEs",
    creator: "Alice Smith",
    category: "Software Development",
    status: "In Progress",
    creationDate: "2024-05-10",
    lastUpdated: "2024-06-25",
    progress: 75,
  },
  {
    title: "Local Business SEO Strategy",
    creator: "Bob Johnson",
    category: "Marketing",
    status: "Completed",
    creationDate: "2024-04-15",
    lastUpdated: "2024-06-20",
    progress: 100,
  },
  {
    title: "E-commerce Website Redesign",
    creator: "Carol White",
    category: "Web Design",
    status: "In Progress",
    creationDate: "2024-05-20",
    lastUpdated: "2024-06-22",
    progress: 50,
  },
  {
    title: "Mobile App Concept Prototyping",
    creator: "David Brown",
    category: "Product Development",
    status: "Paused",
    creationDate: "2024-03-01",
    lastUpdated: "2024-06-18",
    progress: 30,
  },
  {
    title: "Financial Model for Startup Funding",
    creator: "Eve Davis",
    category: "Business Strategy",
    status: "In Progress",
    creationDate: "2024-06-01",
    lastUpdated: "2024-06-25",
    progress: 20,
  },
  {
    title: "Content Marketing Calendar Q3",
    creator: "Frank Green",
    category: "Marketing",
    status: "In Progress",
    creationDate: "2024-05-25",
    lastUpdated: "2024-06-24",
    progress: 60,
  },
  {
    title: "User Onboarding Flow Optimization",
    creator: "Grace Hall",
    category: "UX/UI Design",
    status: "Completed",
    creationDate: "2024-03-10",
    lastUpdated: "2024-06-15",
    progress: 100,
  },
  {
    title: "IoT Device Firmware Update",
    creator: "Henry King",
    category: "Hardware Engineering",
    status: "Paused",
    creationDate: "2024-02-01",
    lastUpdated: "2024-06-10",
    progress: 80,
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex bg-gray-50">
      {/* Main */}
      <div className="flex-1 p-8 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">Project Overview</h2>
          <p className="text-gray-600">
            Monitor and analyze all user-created projects to gain insights into platform activity and trends.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white border rounded-lg p-4 flex items-center gap-4 shadow">
          <input
            type="text"
            placeholder="Search by title or creator..."
            className="border rounded px-3 py-2 flex-1"
          />
          <select className="border rounded px-3 py-2">
            <option>Select Category</option>
            <option>Software Development</option>
            <option>Marketing</option>
            <option>UX/UI</option>
          </select>
          <select className="border rounded px-3 py-2">
            <option>Select Status</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Paused</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Apply Filters
          </button>
          <button className="border px-4 py-2 rounded">Clear Filters</button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white p-4 rounded-lg shadow border">
            <p className="text-gray-500 text-sm">Total Projects</p>
            <h3 className="text-2xl font-bold">2,450</h3>
            <p className="text-xs text-gray-500">All-time projects created</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <p className="text-gray-500 text-sm">New Projects This Month</p>
            <h3 className="text-2xl font-bold">185</h3>
            <p className="text-green-600 text-xs">▲ 23.2% vs last month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <p className="text-gray-500 text-sm">Avg. Project Progress</p>
            <h3 className="text-2xl font-bold">68%</h3>
            <p className="text-red-500 text-xs">▼ 2.1%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <p className="text-gray-500 text-sm">Active Projects</p>
            <h3 className="text-2xl font-bold">1,230</h3>
            <p className="text-xs text-gray-500">Currently in progress</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <p className="text-gray-500 text-sm">Completed Projects</p>
            <h3 className="text-2xl font-bold">980</h3>
            <p className="text-xs text-gray-500">Successfully finished</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold mb-4">Monthly Project Creation Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyProjects}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="created" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Recent Projects</h3>
            <a href="#" className="text-blue-600 text-sm font-medium">
              View All Projects →
            </a>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b bg-gray-50">
                <th className="py-2">Title</th>
                <th>Creator</th>
                <th>Category</th>
                <th>Status</th>
                <th>Creation Date</th>
                <th>Last Updated</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((p) => (
                <tr key={p.title} className="border-b">
                  <td className="py-2">{p.title}</td>
                  <td>{p.creator}</td>
                  <td>{p.category}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        p.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : p.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td>{p.creationDate}</td>
                  <td>{p.lastUpdated}</td>
                  <td>
                    <div className="w-full bg-gray-200 rounded h-2">
                      <div
                        className={`h-2 rounded ${
                          p.progress === 100
                            ? "bg-green-500"
                            : p.progress > 70
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                        }`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </td>
                  <td>
                    <a href="#" className="text-blue-600">
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
