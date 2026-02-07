"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get data from query params
  const destinationId = searchParams.get("destinationId");
  const destinationName = searchParams.get("destinationName") || "Trip";
  const paxCount = parseInt(searchParams.get("paxCount") || "1");
  const selectedDate = searchParams.get("date") || new Date().toISOString();
  const pricePerPax = parseInt(searchParams.get("price") || "0");
  const image = searchParams.get("image") || "";

  // Pricing
  const subtotal = pricePerPax * paxCount;
  const serviceFee = 2500;
  const totalAmount = subtotal + serviceFee;

  // State
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Select, 2: Process/Success

  const handlePay = () => {
    if (!selectedMethod) return;

    setIsProcessing(true);
    setStep(2); // Move to processing UI if needed, or just show spinner

    setTimeout(() => {
      setIsProcessing(false);
      setStep(3); // Success
    }, 1500);
  };

  const paymentMethods = [
    {
      id: "qris",
      name: "QRIS",
      description: "Scan with any e-wallet",
      icon: "qr_code_scanner",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_QRIS.svg/1200px-Logo_QRIS.svg.png",
      recommended: true,
    },
    {
      id: "bca",
      name: "BCA Virtual Account",
      description: "Automatic verification",
      icon: "account_balance",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png",
    },
    {
      id: "mandiri",
      name: "Mandiri Virtual Account",
      description: "Bill payment",
      icon: "account_balance",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png",
    },
    {
      id: "bri",
      name: "BRI Virtual Account",
      description: "BRIVA",
      icon: "account_balance",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/1280px-BANK_BRI_logo.svg.png",
    },
    {
      id: "bni",
      name: "BNI Virtual Account",
      description: "Mobile banking",
      icon: "account_balance",
      image:
        "https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png",
    },
  ];

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-5xl text-emerald-600">
              check_circle
            </span>
          </div>
          <h1 className="text-3xl font-black text-gray-900">
            Payment Successful!
          </h1>
          <p className="text-gray-500">
            Your booking for{" "}
            <strong className="text-gray-800">{destinationName}</strong> has
            been confirmed. An email with your ticket has been sent.
          </p>
          <div className="pt-4 space-y-3">
            <Link
              href="/dashboard"
              className="block w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all"
            >
              View Ticket
            </Link>
            <Link
              href="/"
              className="block w-full py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20 pt-28">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header / Stepper */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-500 text-sm">
              Complete your booking securely
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold">
              1
            </span>
            <span className="text-sm font-semibold text-gray-900">Payment</span>
            <div className="w-8 h-[1px] bg-gray-300 mx-2"></div>
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs font-bold">
              2
            </span>
            <span className="text-sm text-gray-400">Success</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* LEFT PANEL: Payment Methods */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500">
                  credit_card
                </span>
                Select Payment Method
              </h2>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`
                                    relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-start gap-4 hover:shadow-md
                                    ${
                                      selectedMethod === method.id
                                        ? "border-emerald-500 bg-emerald-50/30"
                                        : "border-gray-100 hover:border-emerald-200 bg-white"
                                    }
                                `}
                  >
                    <div
                      className={`
                                    w-16 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors overflow-hidden bg-white p-1
                                    ${selectedMethod === method.id ? "ring-2 ring-emerald-500" : "border border-gray-200"}
                                `}
                    >
                      {method.image ? (
                        <img
                          src={method.image}
                          alt={method.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="material-symbols-outlined text-gray-400">
                          {method.icon}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">
                          {method.name}
                        </h3>
                        {method.recommended && (
                          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Best
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {method.description}
                      </p>
                    </div>
                    <div className="mt-1">
                      <div
                        className={`
                                        w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                                        ${selectedMethod === method.id ? "border-emerald-500 bg-emerald-500" : "border-gray-300"}
                                    `}
                      >
                        {selectedMethod === method.id && (
                          <span className="material-symbols-outlined text-white text-xs font-bold">
                            check
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center gap-2 text-gray-500 text-sm">
              <span className="material-symbols-outlined text-lg">lock</span>
              <span>100% Secure & Encrypted Payment</span>
            </div>
          </div>

          {/* RIGHT PANEL: Order Summary - Sticky */}
          <div className="relative">
            <div className="sticky top-8 bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                Order Summary
              </h2>

              {/* Trip Thumbnail */}
              <div className="flex gap-4 items-start">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                  {image && (
                    <img
                      src={image}
                      alt={destinationName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 line-clamp-2">
                    {destinationName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(selectedDate).toLocaleDateString()}
                  </p>
                  <div className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-md inline-block mt-2">
                    {paxCount} Pax
                  </div>
                </div>
              </div>

              {/* Pricing Table */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Service Fee</span>
                  <span>Rp {serviceFee.toLocaleString("id-ID")}</span>
                </div>
                <div className="border-t border-dashed border-gray-200 my-2"></div>
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-emerald-600">
                    Rp {totalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePay}
                disabled={!selectedMethod || isProcessing}
                className={`
                            w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg active:scale-95
                            ${
                              !selectedMethod || isProcessing
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                                : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30"
                            }
                        `}
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin material-symbols-outlined">
                      progress_activity
                    </span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">lock</span>
                    <span>Pay Rp {totalAmount.toLocaleString("id-ID")}</span>
                  </>
                )}
              </button>

              {!selectedMethod && (
                <p className="text-xs text-center text-red-400 animate-pulse">
                  * Please select a payment method
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
