"use client";

import React, { useEffect, useState } from "react";
import { getAllVouchers, createVoucher, deleteVoucher, toggleVoucherStatus } from "@/actions/voucher";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function AdminVouchersPage() {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVouchers = async () => {
    setIsLoading(true);
    const result = await getAllVouchers();
    if (result.success) setVouchers(result.vouchers);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await createVoucher(formData);
    if (result.success) {
      toast.success("Voucher created!");
      e.currentTarget.reset();
      fetchVouchers();
    } else {
      toast.error(result.error || "Failed to create");
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Voucher Management</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Create and manage promotional codes to boost sales.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Create */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">Create New</h3>
            
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Promo Code</label>
              <input name="code" required placeholder="HOLIDAY20" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-bold uppercase" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Discount</label>
                <input name="discount" type="number" required placeholder="10" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-bold" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Type</label>
                <select name="type" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-bold">
                  <option value="PERCENTAGE">% Percentage</option>
                  <option value="FLAT">Flat IDR</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Min. Purchase</label>
              <input name="minPurchase" type="number" defaultValue="0" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-bold" />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Expiry Date</label>
              <input name="expiryDate" type="date" required className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-bold" />
            </div>

            <button type="submit" className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">
              Save Voucher
            </button>
          </form>
        </div>

        {/* List Vouchers */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                <tr>
                  <th className="p-6">Code</th>
                  <th className="p-6">Discount</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {vouchers.map((v) => (
                  <tr key={v.id} className="group">
                    <td className="p-6">
                      <span className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">{v.code}</span>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Exp: {new Date(v.expiryDate).toLocaleDateString()}</p>
                    </td>
                    <td className="p-6">
                      <span className="font-black text-emerald-600">
                        {v.type === 'PERCENTAGE' ? `${v.discount}%` : `IDR ${v.discount.toLocaleString()}`}
                      </span>
                    </td>
                    <td className="p-6">
                      <button 
                        onClick={() => toggleVoucherStatus(v.id, v.isActive)}
                        className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${v.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}
                      >
                        {v.isActive ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="p-6 text-right">
                      <button 
                        onClick={() => deleteVoucher(v.id).then(fetchVouchers)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {vouchers.length === 0 && <div className="p-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">No vouchers created.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
