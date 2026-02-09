import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTicketEmail = async (
  email: string,
  ticketData: {
    bookingId: string;
    destinationName: string;
    date: string;
    pax: number;
    totalPrice: number;
  }
) => {
  console.log(`[EMAIL SYSTEM] Sending Ticket to ${email} for booking ${ticketData.bookingId}...`);
  
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_123456789") {
    console.warn("Resend API Key not configured. Skipping real email send.");
    return { success: true, mocked: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Malang Premium <onboarding@resend.dev>', // Use verified domain in production
      to: email,
      subject: `Your E-Ticket: ${ticketData.destinationName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #10b981; margin: 0;">Malang Premium</h1>
            <p style="color: #666; text-transform: uppercase; letter-spacing: 2px; font-size: 12px;">Official E-Ticket</p>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
            <h2 style="margin-top: 0; color: #111816;">${ticketData.destinationName}</h2>
            <div style="display: grid; grid-template-cols: 1fr 1fr; gap: 10px;">
              <p><strong>Booking ID:</strong> <br/> #${ticketData.bookingId.toUpperCase()}</p>
              <p><strong>Travel Date:</strong> <br/> ${ticketData.date}</p>
              <p><strong>Guests:</strong> <br/> ${ticketData.pax} Pax</p>
              <p><strong>Total Paid:</strong> <br/> Rp ${ticketData.totalPrice.toLocaleString()}</p>
            </div>
          </div>
          
          <div style="color: #666; font-size: 14px; line-height: 1.6;">
            <p>Thank you for choosing Malang Premium. Please show this email to our driver upon pickup.</p>
            <p style="font-style: italic;">Note: Pickup is usually at 03:00 AM for sunrise tours. Please check your specific itinerary details in the app.</p>
          </div>
          
          <div style="text-align: center; margin-top: 40px; border-top: 1px solid #eee; pt: 20px;">
            <p style="color: #999; font-size: 12px;">&copy; 2023 Malang Premium Tours. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Unexpected Email Error:", err);
    return { success: false, error: err };
  }
};