"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTravel } from "@/context/TravelContext";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { currentBooking, destinations, formatPrice } = useTravel();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Retrieve destination details from ID
  const destination = destinations.find(
    (d) => d.id === currentBooking.destinationId,
  );

  // If no booking data, redirect home
  if (!currentBooking.destinationId || !destination) {
    if (typeof window !== "undefined") router.push("/");
    return null;
  }

  const paymentMethods = [
    {
      id: "qris",
      name: "QRIS",
      description: "Scan with any e-wallet",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_QRIS.svg/1200px-Logo_QRIS.svg.png",
      recommended: true,
    },
    {
      id: "bca",
      name: "BCA Virtual Account",
      description: "Automatic verification",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png",
    },
    {
      id: "mandiri",
      name: "Mandiri Virtual Account",
      description: "Bill payment",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png",
    },
    {
      id: "bri",
      name: "BRI Virtual Account",
      description: "BRIVA",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/1280px-BANK_BRI_logo.svg.png",
    },
  ];

  const handlePay = () => {
    if (!selectedMethod) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment Received!", { duration: 3000 });
      router.push("/payment-success");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20 pt-28">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Secure Checkout</h1>
          <p className="text-gray-500">
            Complete your payment to secure your adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Payment Methods */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500">
                  credit_card
                </span>
                Payment Method
              </h2>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                      selectedMethod === method.id
                        ? "border-emerald-500 bg-emerald-50/50 shadow-md ring-1 ring-emerald-500"
                        : "border-gray-100 hover:border-emerald-200 bg-white"
                    }`}
                  >
                    <div className="w-16 h-10 flex items-center justify-center bg-white rounded border border-gray-100 p-1 shrink-0">
                      <img
                        src={method.image}
                        alt={method.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">
                          {method.name}
                        </h3>
                        {method.recommended && (
                          <span className="text-[10px] bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded-full">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {method.description}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedMethod === method.id ? "border-emerald-500 bg-emerald-500" : "border-gray-200"}`}
                    >
                      {selectedMethod === method.id && (
                        <span className="material-symbols-outlined text-white text-sm">
                          check
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="relative">
            <div className="sticky top-28 bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                Order Summary
              </h2>

              <div className="flex gap-4">
                <img
                  src={destination.image}
                  className="w-20 h-20 rounded-xl object-cover bg-gray-200"
                  alt="Thumb"
                />
                <div>
                  <h3 className="font-bold text-gray-900 line-clamp-2">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Ticket Price (x{currentBooking.pax})</span>
                  <span>
                    {formatPrice(destination.price * currentBooking.pax)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>{formatPrice(2500)}</span>
                </div>
                <div className="border-t border-dashed border-gray-200 pt-2 flex justify-between text-lg font-black text-gray-900">
                  <span>Total</span>
                  <span className="text-emerald-600">
                    {formatPrice(currentBooking.totalPrice + 2500)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={!selectedMethod || isProcessing}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </button>
              {!selectedMethod && (
                <p className="text-xs text-center text-red-500">
                  Please select a payment method
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
