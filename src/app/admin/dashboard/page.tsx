"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import dayjs from "dayjs";

// ===================
// Fake MongoDB data
// ===================
const payments = [
  { _id: "1", total: 98, status: "paid", created_at: "2024-06-10T09:15:00.000Z" },
  { _id: "2", total: 799, status: "paid", created_at: "2024-07-01T11:00:00.000Z" },
  { _id: "3", total: 39, status: "paid", created_at: "2024-08-15T14:30:00.000Z" },
  { _id: "4", total: 150, status: "paid", created_at: "2024-06-05T12:00:00.000Z" },
];

function getMonthlyRevenue(payments: any[]) {
  const monthly: Record<string, number> = {};
  payments.forEach((p) => {
    if (p.status === "paid") {
      const month = dayjs(p.created_at).format("MMM");
      monthly[month] = (monthly[month] || 0) + p.total;
    }
  });
  return Object.entries(monthly).map(([month, revenue]) => ({ month, revenue }));
}

const revenueData = getMonthlyRevenue(payments);

const userGrowth = [
  { quarter: "Q1", users: 1200 },
  { quarter: "Q2", users: 1800 },
  { quarter: "Q3", users: 2500 },
  { quarter: "Q4", users: 3200 },
];

const purchases = [
  { id: "P-00101", service: "Enterprise AI Suite", user: "Alice Johnson", date: "2024-07-28", amount: "$5,000.00", status: "Completed" },
  { id: "P-00102", service: "Cloud Hosting Platinum", user: "Bob Smith", date: "2024-07-27", amount: "$1,200.00", status: "Pending" },
  { id: "P-00103", service: "Legal Advisory Package", user: "Charlie Brown", date: "2024-07-26", amount: "$2,500.00", status: "Completed" },
  { id: "P-00104", service: "Marketing Strategy Boost", user: "Diana Prince", date: "2024-07-25", amount: "$800.00", status: "Completed" },
  { id: "P-00105", service: "Startup Incubation Program", user: "Eve Adams", date: "2024-07-24", amount: "$10,000.00", status: "Pending" },
  { id: "P-00106", service: "Financial Modeling Workshop", user: "Frank Miller", date: "2024-07-23", amount: "$300.00", status: "Completed" },
  { id: "P-00107", service: "Cybersecurity Audit", user: "Grace Hopper", date: "2024-07-22", amount: "$1,800.00", status: "Cancelled" },
];

export default function DashboardPage() {
  return (
    <div className="flex bg-gray-50">

      {/* Main */}
      <div className="flex-1 p-8 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6 flex justify-between items-center shadow">
          <div>
            <h2 className="text-xl font-bold">Hello, FoundersHub Admin!</h2>
            <p className="text-sm text-gray-700">
              Here’s a quick overview of your ecosystem’s performance and recent activities.
            </p>
          </div>
          <img src="https://i.pravatar.cc/80" alt="Admin" className="rounded-full border w-16 h-16" />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow border">
            <p className="text-gray-500 text-sm">Active Projects</p>
            <h3 className="text-2xl font-bold">2,300</h3>
            <p className="text-green-600 text-xs">▲ 15.2% since last month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <p className="text-gray-500 text-sm">Registered Users</p>
            <h3 className="text-2xl font-bold">8,750</h3>
            <p className="text-green-600 text-xs">▲ 8.1% since last month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h3 className="text-2xl font-bold">$1.2M</h3>
            <p className="text-green-600 text-xs">▲ 20.5% since last month</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="font-semibold mb-4">Revenue Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="font-semibold mb-4">User Growth by Quarter</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#ec4899" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Latest Service Purchases</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by User..."
                className="border px-3 py-1 rounded text-sm"
              />
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b bg-gray-50">
                <th className="py-2">Purchase ID</th>
                <th>Service Name</th>
                <th>User Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="py-2">{p.id}</td>
                  <td>{p.service}</td>
                  <td>{p.user}</td>
                  <td>{p.date}</td>
                  <td>{p.amount}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        p.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : p.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.status}
                    </span>
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