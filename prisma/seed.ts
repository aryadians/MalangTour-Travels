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

  // 1.5 Create/Upsert Regular User
  const user = await prisma.user.upsert({
    where: { email: "user@malangtour.com" },
    update: {},
    create: {
      email: "user@malangtour.com",
      name: "Sarah Wijaya",
      password: hashedPassword,
      role: "USER",
      points: 1200,
      referralCode: "SARAH123",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "david@example.com" },
    update: {},
    create: {
      email: "david@example.com",
      name: "David Chen",
      password: hashedPassword,
      role: "USER",
      points: 500,
      referralCode: "DAVID777",
    },
  });

  // 2. Create/Upsert Destinations
  const bromo = await prisma.destination.upsert({
    where: { slug: "bromo-sunrise-adventure" },
    update: {},
    create: {
      name: "Bromo Sunrise Adventure",
      slug: "bromo-sunrise-adventure",
      description: "Experience the iconic sunrise over the Bromo Tengger Semeru National Park. A journey through the sea of sand and the majestic crater rim.",
      price: 750000,
      location: "Probolinggo, East Java",
      rating: 5.0,
      category: "Gunung",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1626245914933-9f0940cc0603?auto=format&fit=crop&q=80&w=1000"
      ]),
      facilities: JSON.stringify(["Private 4x4 Jeep", "Certified Guide", "Hot Coffee/Tea", "Entrance Tickets"]),
      highlights: JSON.stringify(["Sunrise at King Kong Hill", "Widodaren Valley", "Bromo Crater Hike"]),
      itinerary: JSON.stringify([
        { time: "00:30 AM", title: "Malang Pickup", activity: "Start from your location" },
        { time: "03:30 AM", title: "Penanjakan", activity: "Wait for the sunrise" },
        { time: "06:00 AM", title: "Sea of Sand", activity: "Jeep photo session" }
      ]),
    },
  });

  const honeymoon = await prisma.destination.upsert({
    where: { slug: "bromo-batu-honeymoon" },
    update: {},
    create: {
      name: "Bromo & Batu Honeymoon",
      slug: "bromo-batu-honeymoon",
      description: "A 3-Day Journey of Love above the Clouds. Experience the magic of East Java with exclusive private service.",
      price: 8500000,
      location: "Malang, East Java",
      rating: 5.0,
      category: "Honeymoon",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1510662145379-13537db782dc?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000"
      ]),
      facilities: JSON.stringify(["Luxury Villa", "Private Photographer", "Romantic Dinner", "Private Car"]),
      highlights: JSON.stringify(["Picnic at Savanna", "Batu Flower Garden", "Sunset at Paralayang"]),
      itinerary: JSON.stringify([
        { day: 1, title: "Arrival", activity: "Candlelight Dinner" },
        { day: 2, title: "Bromo", activity: "Private Sunrise" },
        { day: 3, title: "Batu", activity: "City Tour" }
      ]),
    },
  });

  const jatimPark = await prisma.destination.upsert({
    where: { slug: "jatim-park-2-zoo" },
    update: {},
    create: {
      name: "Jatim Park 2 (Batu Secret Zoo)",
      slug: "jatim-park-2-zoo",
      description: "Explore one of Asia's best zoos and the Pohon Inn hotel. A world-class educational and recreational park perfect for families.",
      price: 150000,
      location: "Batu, East Java",
      rating: 4.8,
      category: "Kota",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000"
      ]),
      facilities: JSON.stringify(["Shuttle Bus", "Food Court", "Locker Room", "Wheelchair Accessible"]),
      highlights: JSON.stringify(["Secret Zoo", "Museum Satwa", "Eco Green Park"]),
      itinerary: JSON.stringify([
        { time: "09:00 AM", title: "Zoo Entry", activity: "Animal observation" },
        { time: "01:00 PM", title: "Lunch Break", activity: "Jungle-themed food court" }
      ]),
    },
  });

  const museumAngkut = await prisma.destination.upsert({
    where: { slug: "museum-angkut-heritage" },
    update: {},
    create: {
      name: "Museum Angkut",
      slug: "museum-angkut-heritage",
      description: "The first transportation museum in Asia. Features over 300 collections of traditional to modern transportation.",
      price: 120000,
      location: "Batu, East Java",
      rating: 4.7,
      category: "Kota",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1533158674514-6330554c0e64?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1510662145379-13537db782dc?auto=format&fit=crop&q=80&w=1000"
      ]),
      facilities: JSON.stringify(["Photo Spot", "Snack Bar", "Gift Shop"]),
      highlights: JSON.stringify(["Buckingham Palace Zone", "Gangster Town", "Movie Star Studio"]),
      itinerary: JSON.stringify([
        { time: "03:00 PM", title: "Exploration", activity: "Walk through history" },
        { time: "06:30 PM", title: "Night Parade", activity: "Vibrant costume show" }
      ]),
    },
  });

  // 3. Seed Reviews
  await prisma.review.createMany({
    data: [
      {
        userId: user.id,
        destinationId: bromo.id,
        rating: 5,
        comment: "Absolutely breathtaking! The Jeep driver was a pro and the sunrise was perfect.",
      },
      {
        userId: user2.id,
        destinationId: bromo.id,
        rating: 5,
        comment: "Seamless experience. Best way to see Bromo without any stress.",
      },
      {
        userId: user.id,
        destinationId: honeymoon.id,
        rating: 5,
        comment: "Our honeymoon was perfect. The villa was incredible and the photos are stunning!",
      }
    ],
  });

  console.log("Seeding finished successfully.");
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