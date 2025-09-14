import { Comment } from "./comment";
import { User } from "./user";

export interface Task {
  id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  assignee: User;
  lead: User;
  team: string;
  createdAt: string;
  updatedAt: string;
  deadline: string;
  comments: Comment[];
}







