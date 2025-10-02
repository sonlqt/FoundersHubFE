"use client";

import { useEffect, useState } from "react";
import { Construction, Clock } from "lucide-react";
import dayjs from "dayjs";

export default function UnderConstruction() {
  // Target day: 10/10 năm nay
  const targetDate = dayjs().month(9).date(10).hour(0).minute(0).second(0); // tháng 9 = October (0-indexed)
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = dayjs();
    const diff = targetDate.diff(now);

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: targetDate.diff(now, "day"),
      hours: targetDate.diff(now, "hour") % 24,
      minutes: targetDate.diff(now, "minute") % 60,
      seconds: targetDate.diff(now, "second") % 60,
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg text-center border">
        {/* Icon */}
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-yellow-100 text-yellow-600 rounded-full">
          <Construction size={40} />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Trang này đang xây dựng 🚧
        </h1>
        <p className="text-gray-600 mb-6">
          Chúng tôi đang làm việc chăm chỉ để mang đến cho bạn trải nghiệm tốt
          nhất. Vui lòng quay lại sau nhé!
        </p>

        {/* Countdown */}
        <div className="mb-6">
          <div className="flex justify-center gap-4 text-red-500">
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.days}</div>
              <div className="text-xs text-black">Ngày</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.hours}</div>
              <div className="text-xs text-black">Giờ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.minutes}</div>
              <div className="text-xs text-black">Phút</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.seconds}</div>
              <div className="text-xs text-black">Giây</div>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500 flex items-center justify-center gap-1">
            <Clock size={16} /> Đếm ngược đến ngày 10/10
          </p>
        </div>

        {/* Button */}
        <a
          href="/admin"
          className="inline-block px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Quay lại Dashboard
        </a>
      </div>
    </div>
  );
}
