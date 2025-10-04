import ClientSummary from "@/app/customer/service/order/component/ClientSummary";
import ServiceSummary from "@/app/customer/service/order/component/ServiceSummary";

export default function OrderPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <ClientSummary />
        <ServiceSummary />
      </div>
    </div>
  );
}
