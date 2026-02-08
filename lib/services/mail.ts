// In production: import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

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
  
  // --- REAL INTEGRATION CODE ---
  /*
  await resend.emails.send({
    from: 'Malang Premium <tickets@malangtour.com>',
    to: email,
    subject: `Your E-Ticket: ${ticketData.destinationName}`,
    html: `<h1>Your Journey Begins!</h1><p>Booking ID: ${ticketData.bookingId}</p>...`
  });
  */

  return { success: true };
};
