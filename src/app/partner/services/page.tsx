"use client";

import {
  Card,
  Title,
  Text,
  Metric,
  Grid,
  Flex,
  Badge,
  Button,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  BarChart,
  AreaChart,
} from "@tremor/react";
import {
  Briefcase,
  ShoppingCart,
  Star,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash,
} from "lucide-react";
import { Menu } from "@headlessui/react";

// Mock data
const services = [
  { name: "Performance Marketing", price: 4200, orders: 55, status: "Active" },
  { name: "Content Marketing", price: 2800, orders: 40, status: "Active" },
  { name: "B2C Marketing", price: 3000, orders: 25, status: "Inactive" },
  { name: "B2B Marketing", price: 1800, orders: 18, status: "Active" },
];

// KPI Data
const kpiData = [
  {
    title: "Total Services",
    metric: services.length,
    icon: Briefcase,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Total Orders",
    metric: services.reduce((s, r) => s + r.orders, 0),
    icon: ShoppingCart,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Top Service",
    metric: services.reduce((a, b) => (a.orders > b.orders ? a : b)).name ?? "-",
    icon: Star,
    color: "bg-amber-50 text-amber-600",
  },
];

// Chart Data
const mostBooked = services.map((s) => ({
  service: s.name,
  Orders: s.orders,
}));

const highestEarnings = [
  { month: "Jan", Earnings: 3200 },
  { month: "Feb", Earnings: 4200 },
  { month: "Mar", Earnings: 3800 },
  { month: "Apr", Earnings: 5000 },
  { month: "May", Earnings: 4600 },
  { month: "Jun", Earnings: 5200 },
];

export default function ServicesPage() {
  return (
    <main className="p-6 space-y-6">
      <Title className="text-xl font-semibold">Services</Title>

      {/* KPI Row */}
      <Grid numItemsLg={3} className="gap-6">
        {kpiData.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="border border-gray-200 shadow-sm rounded-lg p-4"
            >
              <Flex justifyContent="between" alignItems="center">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <Text className="text-gray-600">{item.title}</Text>
                </div>
              </Flex>
              <Metric className="mt-4">{item.metric}</Metric>
            </Card>
          );
        })}
      </Grid>

      {/* Services Table */}
      <Card className="border border-gray-200 shadow-sm rounded-lg p-4">
        <Flex justifyContent="between" alignItems="center" className="mb-4">
          <Title className="text-lg font-medium">Service List</Title>
          <Button
            size="sm"
            color="emerald"
            className="flex items-center gap-2 !px-3 !py-1.5 !font-medium whitespace-nowrap"
          >
            <span>+ Add Service</span>
          </Button>
        </Flex>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Service Name</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Total Orders</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((s) => (
              <TableRow key={s.name}>
                <TableCell>{s.name}</TableCell>
                <TableCell>${s.price.toLocaleString()}</TableCell>
                <TableCell>{s.orders}</TableCell>
                <TableCell>
                  <Badge
                    className={`!bg-transparent !px-2 !py-0.5 ${
                      s.status === "Active"
                        ? "!text-emerald-600"
                        : "!text-gray-500"
                    }`}
                  >
                    {s.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md border border-gray-200 bg-white shadow-md focus:outline-none z-50">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`flex items-center gap-2 px-3 py-2 text-sm w-full text-left ${
                                active ? "bg-gray-100" : ""
                              }`}
                            >
                              <Eye className="h-4 w-4 text-gray-600" />
                              View
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`flex items-center gap-2 px-3 py-2 text-sm w-full text-left ${
                                active ? "bg-gray-100" : ""
                              }`}
                            >
                              <Pencil className="h-4 w-4 text-blue-600" />
                              Edit
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`flex items-center gap-2 px-3 py-2 text-sm w-full text-left text-rose-600 ${
                                active ? "bg-gray-100" : ""
                              }`}
                            >
                              <Trash className="h-4 w-4" />
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Charts Row */}
      <Grid numItemsLg={2} className="gap-6">
        <Card className="border border-gray-200 shadow-sm rounded-lg p-4">
          <Title className="text-lg font-medium">Most Booked Services</Title>
          <div className="mt-6 h-64">
            <BarChart
              className="h-full"
              data={mostBooked}
              index="service"
              categories={["Orders"]}
              colors={["#2563EB"]}
              yAxisWidth={48}
            />
          </div>
        </Card>

        <Card className="border border-gray-200 shadow-sm rounded-lg p-4">
          <Title className="text-lg font-medium">Highest Earning Services</Title>
          <div className="mt-6 h-64">
            <AreaChart
              className="h-full"
              data={highestEarnings}
              index="month"
              categories={["Earnings"]}
              colors={["#10B981"]}
              yAxisWidth={48}
            />
          </div>
        </Card>
      </Grid>
    </main>
  );
}
