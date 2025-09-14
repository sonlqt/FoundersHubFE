export interface Package  {
  id: string;
  providerId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  durationMonths: number;
  discountPercent: number;
  status: "active" | "inactive"; 
  createdAt: string; 
  updatedAt: string; 
};
