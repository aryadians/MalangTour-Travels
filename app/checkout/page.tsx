"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTravel } from "@/context/TravelContext";
import toast from "react-hot-toast";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { currentBooking, destinations, formatPrice } = useTravel();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showVA, setShowVA] = useState(false);

  // Fake VA Number generator
  const [vaNumber, setVaNumber] = useState("");
  const [expiryTime, setExpiryTime] = useState(3600); // 1 hour

  useEffect(() => {
    if (showVA) {
      const timer = setInterval(() => {
        setExpiryTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showVA]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Retrieve destination details
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
      name: "QRIS / E-Wallet",
      description: "Scan with GoPay, OVO, Dana",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_QRIS.svg/1200px-Logo_QRIS.svg.png",
      recommended: true,
      type: "instant",
    },
    {
      id: "bca",
      name: "BCA Virtual Account",
      description: "Automatic verification",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png",
      type: "va",
    },
    {
      id: "mandiri",
      name: "Mandiri Virtual Account",
      description: "Bill payment",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png",
      type: "va",
    },
    {
      id: "credit_card",
      name: "Credit Card",
      description: "Visa / Mastercard",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
      type: "cc",
    },
  ];

  const handlePay = () => {
    if (!selectedMethod) return;
    setIsProcessing(true);

    // Simulate "Getting Payment Details"
    setTimeout(() => {
      setIsProcessing(false);

      const methodType = paymentMethods.find(
        (m) => m.id === selectedMethod,
      )?.type;

      if (methodType === "va") {
        // Generate Fake VA
        const bankCode = selectedMethod === "bca" ? "8277" : "8888";
        setVaNumber(`${bankCode}08${Math.floor(Math.random() * 100000000)}`);
        setShowVA(true);
        toast.success("Virtual Account Created!");
      } else {
        // Direct Success for QRIS/CC (Simulation)
        toast.success("Payment Received!", { duration: 3000 });
        router.push("/payment-success");
      }
    }, 1500);
  };

  const handleCopyVA = () => {
    navigator.clipboard.writeText(vaNumber);
    toast.success("VA Number Copied!");
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      router.push("/payment-success");
    }, 2000);
  };

  if (showVA) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-6">
            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-2">
              Complete Payment In
            </p>
            <div className="text-3xl font-black text-orange-500 font-mono">
              {formatTime(expiryTime)}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 animate-pulse"></div>
            <p className="text-sm text-gray-500 mb-1">Virtual Account Number</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 tracking-wider font-mono">
                {vaNumber}
              </span>
              <button
                onClick={handleCopyVA}
                className="text-emerald-600 hover:text-emerald-700 font-bold text-sm"
              >
                COPY
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="bg-white p-1 rounded border border-gray-200 w-12 h-8 flex items-center justify-center">
                <img
                  src={
                    paymentMethods.find((m) => m.id === selectedMethod)?.image
                  }
                  className="max-w-full max-h-full"
                  alt="Bank Logo"
                />
              </div>
              <span className="text-sm font-bold text-gray-700">
                Total: {formatPrice(currentBooking.totalPrice + 2500)}
              </span>
            </div>
          </div>

          <button
            onClick={handleConfirmPayment}
            className="w-full py-4 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30"
          >
            {isProcessing ? "Checking Payment..." : "I Have Paid"}
          </button>

          <p className="text-center mt-4 text-xs text-gray-400">
            Payment will be verified automatically.
          </p>
        </div>
      </div>
    );
  }

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
                Select Payment Method
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col gap-4 ${
                      selectedMethod === method.id
                        ? "border-emerald-500 bg-emerald-50/30 shadow-md ring-1 ring-emerald-500"
                        : "border-gray-100 hover:border-emerald-200 bg-white"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="h-8 flex items-center">
                        <img
                          src={method.image}
                          alt={method.name}
                          className="h-full w-auto object-contain max-w-[80px]"
                        />
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

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">
                          {method.name}
                        </h3>
                        {method.recommended && (
                          <span className="text-[10px] bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded-full">
                            PROMO
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {method.description}
                      </p>
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
                    {currentBooking.date
                      ? new Date(currentBooking.date).toLocaleDateString()
                      : new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
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
                <div className="border-t border-dashed border-gray-300 pt-2 flex justify-between text-lg font-black text-gray-900 mt-2">
                  <span>Total</span>
                  <span className="text-emerald-600">
                    {formatPrice(currentBooking.totalPrice + 2500)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={!selectedMethod || isProcessing}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isProcessing ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    Pay Securely
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    lock
                  </span>
                  Encrypted & Secure Payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
