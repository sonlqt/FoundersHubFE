import { Manager } from "./user";

export type Project = {
  id: string;
  name: string;
  description: string;
  managerId: Manager;
  status: 'active' | 'inactive' | string;
  startDate: string; // ISO
  endDate: string;   // ISO
  teamSize: number;
  progress: number; // 0 - 100
};