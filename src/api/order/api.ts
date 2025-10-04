import { CreateOrderRequest, CreateOrderResponse, Order } from "@/api/order/type";

export async function createServiceOrder(
  payload: CreateOrderRequest
): Promise<Order> {
  const res = await fetch(
    `https://foundershub.nducky.id.vn/api/payment/create-order`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to create order: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as CreateOrderResponse;
  return json.data;
}