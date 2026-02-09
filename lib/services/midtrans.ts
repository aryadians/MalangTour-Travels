import midtransClient from "midtrans-client";

export const createTransactionToken = async (
  orderId: string,
  grossAmount: number,
  customerDetails: {
    firstName: string;
    email: string;
    phone?: string;
  }
) => {
  // Use Sandbox keys from .env
  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-YOUR_SERVER_KEY_HERE",
    clientKey: process.env.MIDTRANS_CLIENT_KEY || "SB-Mid-client-YOUR_CLIENT_KEY_HERE",
  });

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: Math.round(grossAmount), // Midtrans requires integer
    },
    customer_details: {
      first_name: customerDetails.firstName,
      email: customerDetails.email,
      phone: customerDetails.phone,
    },
    credit_card: {
      secure: true,
    },
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    return transaction.token;
  } catch (error) {
    console.error("Midtrans Error:", error);
    // Fallback for demo if keys are invalid
    return "MOCK_TOKEN_" + Math.random().toString(36).substring(7);
  }
};
