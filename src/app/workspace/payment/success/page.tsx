'use client';
import React, { useState, useEffect } from 'react';
import { Check, Download, Mail, Phone, ArrowRight, Package, CreditCard, Calendar, User } from 'lucide-react';

function page() {
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Mock order data - in a real app, this would come from URL params or API
  const orderData = {
    orderNumber: "#ORD-2025-001234",
    amount: "$149.99",
    date: "January 15, 2025",
    customerEmail: "john.doe@example.com",
    items: [
      { name: "Premium Course Bundle", price: "$129.99", quantity: 1 },
      { name: "Bonus Materials Pack", price: "$19.99", quantity: 1 }
    ],
    downloadLink: "#",
    estimatedDelivery: "Instant Access"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)]
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-pulse">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for your purchase. Your order has been confirmed and you'll receive an email confirmation shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Details Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Package className="w-6 h-6" />
                  Order Details
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Order Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Order Number</p>
                      <p className="font-semibold text-gray-900">{orderData.orderNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-semibold text-gray-900">{orderData.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Customer</p>
                      <p className="font-semibold text-gray-900">{orderData.customerEmail}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Delivery</p>
                      <p className="font-semibold text-gray-900">{orderData.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Items Purchased</h3>
                  <div className="space-y-3">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">{item.price}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 mt-6 pt-4">
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold text-gray-900">Total</p>
                      <p className="text-2xl font-bold text-green-600">{orderData.amount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download/Access Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Download className="w-6 h-6" />
                  Access Your Purchase
                </h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Your digital products are ready for download. Access your content using the link below:
                </p>
                
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3">
                  <Download className="w-5 h-5" />
                  Download Your Content
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <p className="text-sm text-gray-500 text-center mt-4">
                  Download link will be valid for 30 days
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Steps Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Confirmation Email</p>
                    <p className="text-sm text-gray-600">Check your inbox for receipt and details</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Download className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Download Content</p>
                    <p className="text-sm text-gray-600">Access your purchased materials</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Create Account</p>
                    <p className="text-sm text-gray-600">Set up your profile for future purchases</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-6">
                Our support team is here to help you with any questions about your purchase.
              </p>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white font-medium py-3 px-4 rounded-xl hover:bg-blue-600 transition-colors">
                  <Mail className="w-5 h-5" />
                  Email Support
                </button>
                
                <button className="w-full flex items-center justify-center gap-3 bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors">
                  <Phone className="w-5 h-5" />
                  Call Support
                </button>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Available 24/7 • Response within 2 hours
              </p>
            </div>

            {/* Continue Shopping */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Continue Shopping</h3>
              <p className="text-green-100 mb-4">
                Discover more products and exclusive offers
              </p>
              <button className="w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
          <p className="text-gray-600">
            Questions about your order? Contact us at{' '}
            <a href="mailto:support@company.com" className="text-blue-600 hover:text-blue-700 font-medium">
              support@company.com
            </a>
            {' '}or call{' '}
            <a href="tel:+1-555-0123" className="text-blue-600 hover:text-blue-700 font-medium">
              +1 (555) 012-3456
            </a>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Order processed securely • Your payment information is protected
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;