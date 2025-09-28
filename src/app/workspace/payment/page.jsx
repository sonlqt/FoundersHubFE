"use client";
import React, { useState, useEffect } from "react";

export default function PaymentButton() {
  const [qrLink, setQrLink] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(180); // 3 phút = 180 giây

  // Cleanup interval khi unmount
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  // Hàm tạo đơn hàng
  const createOrder = async () => {
    try {
      const res = await fetch(
        "https://foundershub.nducky.id.vn/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            servicePackageId: "68d18e5f29a71fd88d08bcdd",
            quantity: 30,
            paymentMethod: "bank_transfer",
          }),
          credentials: "include", // Gửi cookie/session
        }
      );

      const json = await res.json();
      if (json.code === 200) {
        setOrderId(json.data.id);
        setQrLink(json.data.qrlink);
        setShowModal(true);
        setTimeLeft(180); // reset timer 3 phút

        // Bắt đầu tracking status mỗi 3 giây
        const id = setInterval(() => checkOrderStatus(json.data.id), 2000);
        setIntervalId(id);

        // Countdown timer
        const countdown = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(id);
              clearInterval(countdown);
              setShowModal(false);
              alert("Hết thời gian thanh toán, vui lòng thử lại!");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        alert("Không thể tạo đơn hàng: " + json.message);
      }
    } catch (err) {
      alert("Có lỗi xảy ra khi gọi API!");
    }
  };

  // Hàm check trạng thái đơn hàng
  const checkOrderStatus = async (id) => {
    try {
      const res = await fetch(
        `https://foundershub.nducky.id.vn/api/payment/orders/${id}`,
        {
          method: "GET",
          credentials: "include", // gửi kèm cookie/session
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await res.json();
      if (json.code === 200 && json.data.status === "Paid") {
        clearInterval(intervalId);
        window.location.href = `/workspace/payment/success`; // redirect
      }
    } catch (err) {
      console.error("Error checking order"); // không log thông tin nhạy cảm
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={createOrder}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
      >
        Thanh toán
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[380px] text-center animate-scaleIn">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Quét mã QR để thanh toán
            </h2>
            {qrLink ? (
              <img
                src={qrLink}
                alt="QR Payment"
                className="w-64 h-64 mx-auto border rounded-lg shadow-md"
              />
            ) : (
              <p className="text-gray-500">Đang tải QR...</p>
            )}

            {/* Countdown Timer */}
            <p className="mt-4 text-sm text-gray-600">
              Thời gian còn lại:{" "}
              <span className="font-semibold text-red-600">
                {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
              </span>
            </p>

            <button
              onClick={() => {
                clearInterval(intervalId);
                setShowModal(false);
              }}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
            >
              Huỷ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
