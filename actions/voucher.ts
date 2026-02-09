"use server";

import { prisma } from "@/lib/prisma";

export async function validateVoucher(code: string, subtotal: number) {
  try {
    const voucher = await prisma.voucher.findUnique({
      where: { code: code.toUpperCase(), isActive: true }
    });

    if (!voucher) {
      return { success: false, message: "Invalid or inactive voucher code." };
    }

    if (new Date() > voucher.expiryDate) {
      return { success: false, message: "Voucher has expired." };
    }

    if (subtotal < voucher.minPurchase) {
      return { 
        success: false, 
        message: `Minimum purchase of Rp ${voucher.minPurchase.toLocaleString()} required.` 
      };
    }

    let discountAmount = 0;
    if (voucher.type === "PERCENTAGE") {
      discountAmount = (subtotal * voucher.discount) / 100;
      if (voucher.maxDiscount && discountAmount > voucher.maxDiscount) {
        discountAmount = voucher.maxDiscount;
      }
    } else {
      discountAmount = voucher.discount;
    }

    return { 
      success: true, 
      discountAmount, 
      code: voucher.code,
      message: "Voucher applied successfully!" 
    };
  } catch (error) {
    return { success: false, message: "Error validating voucher." };
  }
}
