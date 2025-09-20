import { Provider } from "@/api/provider/type";


export type ServicePackage = {
  id: string;
  providerId: Provider;
  name: string;
  description: string;
  price: number;          // giá theo currency
  currency: "USD" | "VND" | string;
  durationMonths: number;
  discountPercent: number;
  features: string[];
  image: string;
  status: "active" | "inactive" | string;
};

export type SearchResponse = {
  code: number;
  message: string;
  data: {
    content: ServicePackage[];
    totalElements: number;
    totalPages: number;
    page: number; // 1-based
    size: number;
  };
  createdAt: string;
};
