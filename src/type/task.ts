import { User } from "./user";

export interface Task {
  id: string;
  projectId: {
    id: string;
    name: string;
    description: string;
    status: string;
    startDate: string | null;
    endDate: string | null;
    progress: number | null;
  };
  name: string;
  description: string;
  status: string;
  priority: "low" | "medium" | "high" | "Low" | "Medium" | "High" | "Emergency";
  dueDate: string;
  createdBy: User;
}
