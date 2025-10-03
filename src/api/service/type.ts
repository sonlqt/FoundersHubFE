import { Provider } from "@/api/provider/type";

export type ServicePackage = {
  id: string;
  providerId: Provider;   // object Provider
  name: string;
  description: string;
  price: number;          // giá (API không trả về currency, nên bỏ)
  durationMonths: number;
  discountPercent: number;
  features: string[];
  serviceScope: string[];        // thêm từ API
  estimatedDelivery: string[];   // thêm từ API
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
