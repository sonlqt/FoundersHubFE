"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchServicePackageById,  } from "@/api/service/api";
import {createServiceOrder} from "@/api/order/api";
import { ServicePackage } from "@/api/service/type";

export default function ServiceSummary() {
  const searchParams = useSearchParams();
  const servicePackageId = searchParams.get("servicePackageId");

const [pkg, setPkg] = useState<ServicePackage | null>(null);
  useEffect(() => {
    if (servicePackageId) {
      fetchServicePackageById(servicePackageId).then(setPkg);
    }
  }, [servicePackageId]);

  const handleConfirm = async () => {
    if (!servicePackageId) return;

    const order = await createServiceOrder({
      servicePackageId,
      quantity: 1,
      paymentMethod: "ZALO_PAY", // tạm hardcode
    });

    if (order.paymentUrl) {
      window.location.href = order.paymentUrl; // redirect sang cổng thanh toán
    } else {
      alert("Đặt hàng thành công, chờ xử lý!");
    }
  };

  if (!pkg) return <p>Loading...</p>;

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h2 className="text-lg font-bold">Service Summary</h2>

      <div className="text-sm space-y-1">
        <p>
          <span className="font-semibold">Name:</span> {pkg.name}
        </p>
        <p>
          <span className="font-semibold">Duration:</span>{" "}
          {pkg.durationMonths} months
        </p>
        <p>
          <span className="font-semibold">Price:</span>{" "}
          {pkg.price.toLocaleString()} VND
        </p>
      </div>

      <button
        onClick={handleConfirm}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
      >
        Confirm & Pay
      </button>
    </div>
  );
}
