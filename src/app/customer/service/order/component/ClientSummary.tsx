"use client";

export default function ClientSummary() {
  return (
    <div className="space-y-6">
      {/* Client Summary */}
      <div className="border rounded-lg p-4 space-y-3">
        <h2 className="text-lg font-bold">Client Summary</h2>
        <p className="text-sm text-gray-600">Please fill in your details</p>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            placeholder="Note"
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Payment Method */}
      {/* <div className="border rounded-lg p-4 space-y-3">
        <h2 className="text-lg font-bold">Payment Method</h2>

        <div className="space-y-2">
          <div className="flex items-center justify-between border rounded px-3 py-2">
            <span>Visa</span>
            <img src="/visa.png" alt="visa" className="h-5" />
          </div>
          <input
            type="text"
            placeholder="Card Number"
            className="w-full border rounded px-3 py-2"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Month"
              className="w-1/2 border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Year"
              className="w-1/2 border rounded px-3 py-2"
            />
          </div>
          <input
            type="text"
            placeholder="CVC"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex items-center justify-between border rounded px-3 py-2 cursor-pointer">
          <span>Paypal</span>
          <img src="/paypal.png" alt="paypal" className="h-5" />
        </div>

        <div className="flex items-center justify-between border rounded px-3 py-2 cursor-pointer">
          <span>Momo</span>
          <img src="/momo.png" alt="momo" className="h-5" />
        </div>
      </div> */}
    </div>
  );
}
