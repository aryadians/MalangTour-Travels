"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createBooking } from "@/actions/booking";
import toast from "react-hot-toast";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get data from query params
  const destinationId = parseInt(searchParams.get("destinationId") || "0");
  const destinationName = searchParams.get("destinationName") || "Trip";
  const paxCount = parseInt(searchParams.get("paxCount") || "1");
  const selectedDate = searchParams.get("date") || "";
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

  const handlePay = async () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    setIsProcessing(true);

    try {
      const result = await createBooking({
        destinationId,
        date: selectedDate,
        pax: paxCount,
        totalPrice: totalAmount,
      });

      if (result.success) {
        toast.success("Payment successful!");
        setStep(3); // Success step
      } else {
        toast.error(result.error || "Payment failed. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    {
      id: "qris",
      name: "QRIS",
      description: "Scan with any e-wallet",
      icon: "qr_code_scanner",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_QRIS.svg/1200px-Logo_QRIS.svg.png",
      recommended: true,
    },
    {
      id: "bca",
      name: "BCA Virtual Account",
      description: "Automatic verification",
      icon: "account_balance",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png",
    },
    {
      id: "mandiri",
      name: "Mandiri Virtual Account",
      description: "Bill payment",
      icon: "account_balance",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png",
    },
  ];

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-[3rem] p-12 max-w-md w-full shadow-2xl text-center space-y-8 animate-in zoom-in-95 duration-300 border border-slate-100">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
            <span className="material-symbols-outlined text-5xl text-emerald-600">task_alt</span>
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payment Confirmed!</h1>
            <p className="text-slate-500 mt-2">
              Your booking for <strong className="text-slate-900 font-black">{destinationName}</strong> is verified.
            </p>
          </div>
          <div className="pt-4 space-y-4">
            <Link
              href="/dashboard"
              className="block w-full py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl hover:scale-105 transition-all"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="block w-full py-4 bg-white border border-slate-200 text-slate-400 font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-50 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-display pb-20 pt-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-emerald-500 font-black text-xs tracking-[0.3em] uppercase mb-2 block">Checkout</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Secure Payment.</h1>
          </div>

          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
            <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs">1</span>
            <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Payment</span>
            <div className="w-12 h-px bg-slate-200 mx-2"></div>
            <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black text-xs">2</span>
            <span className="text-sm font-black text-slate-300 uppercase tracking-widest">Success</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
          {/* LEFT: Payment Methods */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
              <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-widest">
                <span className="material-symbols-outlined text-emerald-500">account_balance_wallet</span>
                Select Method
              </h2>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`
                      relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-500 flex items-center gap-6 group
                      ${selectedMethod === method.id ? "border-emerald-500 bg-emerald-50/20 shadow-lg" : "border-slate-50 hover:border-emerald-200 bg-slate-50/50"}
                    `}
                  >
                    <div className="w-20 h-14 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100 p-2">
                      <img src={method.image} alt={method.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">{method.name}</h3>
                      <p className="text-sm text-slate-400 font-medium">{method.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedMethod === method.id ? "border-emerald-500 bg-emerald-500" : "border-slate-200 group-hover:border-emerald-300"}`}>
                      {selectedMethod === method.id && <span className="material-symbols-outlined text-white text-xs font-bold">check</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 text-white/40 rounded-2xl p-6 flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.2em]">
              <span className="material-symbols-outlined text-emerald-500">verified_user</span>
              <span>100% Encrypted & End-to-End Secure</span>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="relative">
            <div className="sticky top-32 bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200 border border-slate-100 space-y-8">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-6">Summary</h2>

              <div className="flex gap-6 items-start">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-inner">
                  {image ? (
                    <img src={image} alt={destinationName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <span className="material-symbols-outlined text-4xl">landscape</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-xl leading-tight tracking-tight">{destinationName}</h3>
                  <div className="flex items-center gap-2 text-slate-400 mt-2 font-bold text-xs">
                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                    {new Date(selectedDate).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="mt-4 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block">
                    {paxCount} Travelers
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex justify-between text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  <span>Subtotal</span>
                  <span className="text-slate-900">Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  <span>Service Fee</span>
                  <span className="text-slate-900">Rp {serviceFee.toLocaleString("id-ID")}</span>
                </div>
                <div className="border-t border-dashed border-slate-200 my-4"></div>
                <div className="flex justify-between items-center">
                  <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Total Amount</span>
                  <span className="text-3xl font-black text-emerald-500 font-serif italic">
                    Rp {totalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={!selectedMethod || isProcessing}
                className={`
                  w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 shadow-xl active:scale-95
                  ${!selectedMethod || isProcessing
                    ? "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
                    : "bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/20"
                  }
                `}
              >
                {isProcessing ? "Authenticating..." : `Pay Rp ${totalAmount.toLocaleString("id-ID")}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}