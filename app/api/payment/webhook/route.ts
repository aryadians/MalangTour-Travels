import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order_id, status_code, gross_amount, signature_key, transaction_status } = body;

    // Verify Signature
    const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
    const hashed = crypto.createHash("sha512")
      .update(order_id + status_code + gross_amount + serverKey)
      .digest("hex");

    if (hashed !== signature_key) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
    }

    // Update Booking Status based on transaction_status
    if (transaction_status === "capture" || transaction_status === "settlement") {
      await prisma.$transaction(async (tx) => {
        const booking = await tx.booking.update({
          where: { id: order_id },
          data: { status: "CONFIRMED" }
        });

        // Award points if not already awarded
        await tx.user.update({
          where: { id: booking.userId },
          data: { points: { increment: Math.floor(booking.totalPrice / 100) } }
        });
      });
    } else if (transaction_status === "cancel" || transaction_status === "deny" || transaction_status === "expire") {
      await prisma.booking.update({
        where: { id: order_id },
        data: { status: "CANCELLED" }
      });
    }

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
