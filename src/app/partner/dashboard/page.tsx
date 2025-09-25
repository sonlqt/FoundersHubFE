"use client";

import {
  Card,
  Metric,
  Text,
  Flex,
  Grid,
  Title,
  BarChart,
  BadgeDelta,
  List,
  ListItem,
} from "@tremor/react";
import { DollarSign, Briefcase, ShoppingCart, Calendar as Cal } from "lucide-react";
import { KpiCard } from "../components/KPICard";

const kpiData: {
  title: string;
  metric: string;
  delta: string;
  sub: string;
  deltaType: "moderateIncrease" | "unchanged" | "moderateDecrease";
  icon: React.ElementType;
  iconBg: string;
}[] = [
  {
    title: "Total Earnings",
    metric: "$12,450",
    delta: "+12%",
    sub: "vs last month",
    deltaType: "moderateIncrease",
    icon: DollarSign,
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Services Offered",
    metric: "4",
    delta: "4 New",
    sub: "this quarter",
    deltaType: "unchanged",
    icon: Briefcase,
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    title: "New Orders",
    metric: "75",
    delta: "+8%",
    sub: "vs last week",
    deltaType: "moderateIncrease",
    icon: ShoppingCart,
    iconBg: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Upcoming Meetings",
    metric: "6",
    delta: "3 today",
    sub: "scheduled",
    deltaType: "unchanged",
    icon: Cal,
    iconBg: "bg-amber-50 text-amber-600",
  },
];

const earningsData = [
  { category: "Performance Marketing", Earnings: 4200 },
  { category: "Content Marketing", Earnings: 2800 },
  { category: "B2C Marketing", Earnings: 3000 },
  { category: "B2B Marketing", Earnings: 1800 },
];

const orderStatus = [
  { name: "Completed", value: 55 },
  { name: "Pending", value: 12 },
  { name: "Cancelled", value: 8 },
];

/* small helper: map status -> color classes used for the custom progress bar */
const statusColorClass = (name: string) => {
  if (name.toLowerCase() === "completed") return "bg-emerald-500";
  if (name.toLowerCase() === "pending") return "bg-amber-400";
  return "bg-rose-500";
};

export default function DashboardPage() {
  const totalOrders = orderStatus.reduce((s, r) => s + r.value, 0);

  return (
    <main className="p-6 space-y-6">
      <Title className="text-xl font-semibold">Dashboard Overview</Title>

      {/* KPI Cards */}
      <Grid numItemsLg={4} className="gap-6">
        {kpiData.map((item) => <KpiCard key={item.title} {...item} />)}
      </Grid>


      {/* Activity + Appointments */}
      <Grid numItemsLg={2} className="gap-6">
        <Card className="border border-gray-200 shadow-sm rounded-lg p-4">
          <Title className="text-lg font-medium">Recent Activity</Title>
          <List className="mt-4 divide-y divide-gray-100">
            <ListItem className="py-3">
              <Text>New order received for "Performance Marketing"</Text>
              <Text className="text-gray-500 text-sm">2 hours ago</Text>
            </ListItem>
            <ListItem className="py-3">
              <Text>Consultation scheduled with Global Brands for "Content Marketing"</Text>
              <Text className="text-gray-500 text-sm">Yesterday, 2:00 PM</Text>
            </ListItem>
            <ListItem className="py-3">
              <Text>Consultation scheduled with Innovate Corp for "Performance Marketing"</Text>
              <Text className="text-gray-500 text-sm">2 days ago</Text>
            </ListItem>
          </List>
        </Card>

        <Card className="border border-gray-200 shadow-sm rounded-lg p-4">
          <Title className="text-lg font-medium">Upcoming Appointments</Title>
          <List className="mt-4 divide-y divide-gray-100">
            <ListItem className="py-3">
              <Text>Performance Marketing Meeting</Text>
              <Text className="text-gray-500 text-sm">Client: Innovate Corp</Text>
            </ListItem>
            <ListItem className="py-3">
              <Text>Content Marketing Meeting</Text>
              <Text className="text-gray-500 text-sm">Client: Global Brands</Text>
            </ListItem>
          </List>
          <Text className="mt-4 text-blue-600 cursor-pointer text-sm font-medium">View All Calendar</Text>
        </Card>
      </Grid>

      {/* Charts Row */}
      <Grid numItemsLg={2} className="gap-6">
        <Card className="border border-gray-200 shadow-sm rounded-lg p-4">
          <Title className="text-lg font-medium">Service Earnings Breakdown</Title>

          {earningsData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-sm text-gray-500">No data available</div>
          ) : (
            <div className="mt-6 h-64">
              {/* explicit color hex (blue) to avoid theme mapping issues */}
              <BarChart
                className="h-full"
                data={earningsData}
                index="category"
                categories={["Earnings"]}
                colors={["#2563EB"]} /* blue-600 */
                yAxisWidth={48}
              />
            </div>
          )}
        </Card>

        <Card className="border border-gray-200 shadow-sm rounded-lg p-4">
          <Title className="text-lg font-medium">Order Status Summary</Title>

          {totalOrders === 0 ? (
            <div className="mt-6 text-sm text-gray-500">No orders yet</div>
          ) : (
            <div className="mt-6 space-y-6">
              {/* Top overview */}
              <Flex justifyContent="between" alignItems="center">
                <div>
                  <Text className="text-gray-500 text-sm">Total Orders</Text>
                  <Metric>{totalOrders}</Metric>
                </div>
                <div className="flex gap-3">
                  {orderStatus.map((status) => {
                    const colorClass = statusColorClass(status.name);
                    return (
                      <div key={status.name} className="flex items-center gap-1 text-sm">
                        <div className={`w-3 h-3 rounded-full ${colorClass}`} />
                        <span className="text-gray-600">{status.name}</span>
                      </div>
                    );
                  })}
                </div>
              </Flex>

              {/* Bars */}
              <div className="space-y-4">
                {orderStatus.map((status) => {
                  const percent = Math.round((status.value / totalOrders) * 100);
                  const colorClass = statusColorClass(status.name);

                  return (
                    <div key={status.name}>
                      <Flex justifyContent="between" alignItems="center">
                        <Text>{status.name}</Text>
                        <Text className="text-gray-700 font-medium">
                          {status.value} ({percent}%)
                        </Text>
                      </Flex>

                      <div className="mt-2">
                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                          <div
                            className={`${colorClass} h-3`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <Text className="mt-6 text-blue-600 cursor-pointer text-sm font-medium">
            View All Orders
          </Text>
        </Card>
      </Grid>

      {/* Notifications (custom blocks so contrast is explicit) */}
      <Card className="border border-gray-200 shadow-sm rounded-lg p-4">
        <Title className="text-lg font-medium">Notifications & Milestones</Title>

        <div className="mt-4 space-y-4">
          {/* Blue info */}
          <div className="bg-blue-600 text-white rounded-md p-4">
            <div className="font-semibold">Report Ready</div>
            <div className="text-sm opacity-90">Your monthly performance report is ready for review.</div>
          </div>

          {/* Green milestone (left aligned, white or dark text depending on bg) */}
          <div className="border-l-4 border-emerald-500 bg-emerald-50 rounded-md p-4">
            <div className="font-semibold text-emerald-700">Milestone Reached</div>
            <div className="text-sm text-emerald-700">Congratulations! You’ve reached 50 completed services.</div>
          </div>

          {/* Red action required */}
          <div className="bg-rose-600 text-white rounded-md p-4">
            <div className="font-semibold">Action Required</div>
            <div className="text-sm opacity-90">Client request for new service pending approval.</div>
          </div>
        </div>
      </Card>
    </main>
  );
}
