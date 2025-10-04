export type CreateOrderRequest = {
  servicePackageId: string;
  quantity: number;
  paymentMethod: string;
};

export type Order = {
  orderId: string;
  status: string;
  paymentUrl?: string;
};

export type CreateOrderResponse = {
  code: number;
  message: string;
  data: Order;
  createdAt: string;
};