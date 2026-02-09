"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function getAllVouchers() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") throw new Error("Unauthorized");

  try {
    const vouchers = await prisma.voucher.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, vouchers };
  } catch (error) {
    return { success: false, error: "Failed to fetch vouchers" };
  }
}

export async function createVoucher(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  const code = formData.get("code") as string;
  const discount = parseFloat(formData.get("discount") as string);
  const type = formData.get("type") as string;
  const expiryDate = new Date(formData.get("expiryDate") as string);
  const minPurchase = parseFloat(formData.get("minPurchase") as string || "0");

  try {
    await prisma.voucher.create({
      data: {
        code,
        discount,
        type,
        expiryDate,
        minPurchase,
        isActive: true
      }
    });
    revalidatePath("/admin/vouchers");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Code already exists or invalid data" };
  }
}

export async function toggleVoucherStatus(id: string, currentStatus: boolean) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  try {
    await prisma.voucher.update({
      where: { id },
      data: { isActive: !currentStatus }
    });
    revalidatePath("/admin/vouchers");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update voucher" };
  }
}

export async function deleteVoucher(id: string) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  try {
    await prisma.voucher.delete({ where: { id } });
    revalidatePath("/admin/vouchers");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete voucher" };
  }
}