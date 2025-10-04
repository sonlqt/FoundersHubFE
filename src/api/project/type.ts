export interface Manager {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  phone: string;
  gender: string;
  address: string;
  image: string;
  status: string;
}

export interface Project {
  id: string;           // ObjectId từ backend
  name: string;         // Tên project
  description: string;  // Mô tả project
  managerId: Manager;   // Thông tin manager
  status: string;       // active / inactive
  startDate: string;    // "15/01/23"
  endDate: string;      // "30/06/23"
  teamSize: number;     // số lượng team
  progress: number;     // % hoàn thành
}
