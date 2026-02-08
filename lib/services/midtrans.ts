import { NextResponse } from "next/server";

// Simulating Midtrans Snap (Since we don't have real keys yet)
// In production, install: npm install midtrans-client
// import midtransClient from "midtrans-client";

export const createTransactionToken = async (
  orderId: string,
  grossAmount: number,
  customerDetails: {
    firstName: string;
    email: string;
  }
) => {
  // --- REAL INTEGRATION CODE (Uncomment when you have keys) ---
  /*
  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },
    customer_details: {
      first_name: customerDetails.firstName,
      email: customerDetails.email,
    },
  };

  const token = await snap.createTransactionToken(parameter);
  return token;
  */
  
  // --- MOCK RETURN (For Development) ---
  console.log("Mocking Midtrans Token for:", orderId, grossAmount);
  return "MOCK_TOKEN_" + Math.random().toString(36).substring(7);
};
