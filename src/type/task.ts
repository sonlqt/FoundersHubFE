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
  name: string; // chính là title của task
  description: string;
  status: string; // "To Do", "In Progress", "Review", "Done", "Cancelled"...
  priority: "low" | "medium" | "high";
  dueDate: string; // deadline
  createdBy: User;
}
