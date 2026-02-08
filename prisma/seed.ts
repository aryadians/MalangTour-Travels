import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1. Create/Upsert Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@malangtour.com" },
    update: {},
    create: {
      email: "admin@malangtour.com",
      name: "Super Admin",
      password: hashedPassword,
      role: "ADMIN",
      points: 99999,
      referralCode: "ADMINOFFICIAL",
    },
  });

  console.log({ admin });

  // 1.5 Create/Upsert Regular User
  const user = await prisma.user.upsert({
    where: { email: "user@malangtour.com" },
    update: {},
    create: {
      email: "user@malangtour.com",
      name: "Regular User",
      password: hashedPassword, // Reuse the same hash for simplicity (admin123) or create new one
      role: "USER",
      points: 100,
      referralCode: "USER123",
    },
  });

  console.log({ user });

  // 2. Create/Upsert Destinations
  // We'll use the data from the Packages page
  const bromoPackage = await prisma.destination.upsert({
    where: { slug: "bromo-batu-honeymoon" },
    update: {},
    create: {
      name: "Bromo & Batu Honeymoon",
      slug: "bromo-batu-honeymoon",
      description:
        "A 3-Day Journey of Love above the Clouds. Experience the magic of East Java with exclusive private service.",
      price: 8500000,
      location: "Malang, East Java",
      rating: 5.0,
      category: "Honeymoon",
      images: JSON.stringify([
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAAsUaYrtDhpjhzGKaLvVmz0zMf5ozDezVTbhtMfPiIhN7GMKQRpZM_KnbN0igrOMOgxjIe8Q8n54GL3OqeECATpOEiTRXdttnDNGbzBkQsmVvaXdrqPlY-JbeY54lJY6Pjk3Z1aeooHRrMdXs8HgsMf5ZOh2VflDP_EOh3tchktECxPTV_PE8Q_1EWo2bB0yNCjOBAzuvE2EnZJHmXpt3gDd5QLg-HAF5Fwp2sPB-u_LcEAzG9t2KwgSewoAkOx9kCQxAKW3cb3A",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDimMY5bU60ckH73VFh0Bd9AGvDd_9LFm3uzdfSgTySMy7ihf8ErdBpEWk8uRTwrA3D0zPBifa7CRIvo3YYKwHwIQIdL38VFu1t7voTN0XBC0sXpxPB9A-9F1YIFvzSZiSxlZrvmqrHe9BEym7-9ctZSeboZPwsNoekBnq6QTS-O85bIbMfcxgMlYIMv3hYAGAIvLIDIF12BOWPV95Lf8sCTNjdVoSQMfV-BUXpY_DdjF1Mc3LQqcEdV6LpYqU0hCboUibGKIdiwA",
      ]),
      openTime: "24 Hours",
      ticketPrice: "Included",
      facilities: JSON.stringify([
        "Private Jeep",
        "Luxury Villa",
        "Candlelight Dinner",
        "Photographer",
      ]),
      highlights: JSON.stringify([
        "Sunrise at King Kong Hill",
        "Savana Picnic",
        "Batu Flower Garden",
      ]),
      itinerary: JSON.stringify([
        {
          day: 1,
          title: "Arrival & Candlelight Dinner",
          description: "Pick up and check-in to villa.",
        },
        {
          day: 2,
          title: "Bromo Sunrise",
          description: "Early morning Jeep tour to Bromo.",
        },
        {
          day: 3,
          title: "Batu Flower Garden",
          description: "Leisurely breakfast and city tour.",
        },
      ]),
    },
  });

  console.log({ bromoPackage });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
