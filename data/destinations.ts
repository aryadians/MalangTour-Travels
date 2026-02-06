export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
}

export interface Destination {
  id: number;
  name: string;
  category: "Pantai" | "Gunung" | "Kota";
  location: string;
  price: number;
  rating: number;
  description: string;
  images: string[];
  highlights: { icon: string; label: string }[];
  itinerary: ItineraryItem[];
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Pantai Balekambang",
    category: "Pantai",
    location: "Bantur, Kab. Malang",
    price: 50000,
    rating: 4.8,
    description:
      "Tanah Lot-nya Malang. Memiliki Pura di atas pulau karang yang terhubung jembatan panjang. Sunset di sini sangat ikonik. Nikmati deburan ombak pantai selatan yang memukau dan suasana spiritual yang kental di Pura Amarta Jati.",
    images: [
      "https://images.unsplash.com/photo-1602154663343-89fe0bf541ab?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1510662145379-13537db782dc?auto=format&fit=crop&q=80&w=800", // Using generic beach for gallery
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800", // Using generic beach for gallery
    ],
    highlights: [
      { icon: "temple_hindu", label: "Pura Amarta Jati" },
      { icon: "wb_twilight", label: "Iconic Sunset" },
      { icon: "waves", label: "Beach Walk" },
      { icon: "camera_alt", label: "Photography" },
    ],
    itinerary: [
      {
        time: "15:00",
        title: "Arrival & Exploration",
        description: "Arrive at Balekambang Beach, explore the white sandy beach.",
      },
      {
        time: "16:30",
        title: "Visit Pura Ismoyo",
        description: "Walk across the bridge to the Pura Ismoyo on the rock island.",
      },
      {
        time: "17:30",
        title: "Sunset Session",
        description: "Capture the breathtaking sunset with the temple silhouette.",
      },
    ],
  },
  {
    id: 2,
    name: "Gunung Bromo",
    category: "Gunung",
    location: "Taman Nasional BTS",
    price: 350000,
    rating: 5.0,
    description:
      "Saksikan matahari terbit terbaik di Jawa. Paket tour Jeep 4x4 menuju Penanjakan dan Kawah Bromo. Rasakan sensasi petualangan offroad di lautan pasir dan mendaki kawah aktif yang legendaris.",
    images: [
      "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605218427368-35b84d4360e2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1534234828569-fa33213c32fc?auto=format&fit=crop&q=80&w=800",
    ],
    highlights: [
      { icon: "ac_unit", label: "Golden Sunrise" },
      { icon: "directions_car", label: "Jeep 4x4" },
      { icon: "hiking", label: "Crater Trek" },
      { icon: "photo_camera", label: "Pasir Berbisik" },
    ],
    itinerary: [
      {
        time: "03:00",
        title: "Jeep Pick Up",
        description: "Departure to Penanjakan View Point.",
      },
      {
        time: "04:30",
        title: "Sunrise Moment",
        description: "Witness the magical sunrise over Mt. Bromo and Mt. Semeru.",
      },
      {
        time: "06:00",
        title: "Crater Exploration",
        description: "Trek to the Bromo Crater and visit Pura Luhur Poten.",
      },
    ],
  },
  {
    id: 3,
    name: "Kampung Warna Warni Jodipan",
    category: "Kota",
    location: "Kota Malang",
    price: 15000,
    rating: 4.5,
    description:
      "Desa wisata penuh warna di bantaran sungai Brantas. Spot foto instagramable di tengah kota. Dulunya lingkungan kumuh, kini disulap menjadi destinasi wisata penuh seni mural dan warna-warni cerah.",
    images: [
      "https://images.unsplash.com/photo-1596401057633-56565377f06d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555899436-72534f6f4299?auto=format&fit=crop&q=80&w=800", // Generic colorful city
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800", // Generic
    ],
    highlights: [
      { icon: "palette", label: "Colorful Houses" },
      { icon: "brush", label: "Street Art" },
      { icon: "bridge", label: "Glass Bridge" },
      { icon: "local_cafe", label: "Local Snacks" },
    ],
    itinerary: [
      {
        time: "09:00",
        title: "Arrival",
        description: "Enter Jodipan village and explore the murals.",
      },
      {
        time: "09:30",
        title: "Glass Bridge",
        description: "Cross the 'Jembatan Kaca' connecting Jodipan and Tridi.",
      },
      {
        time: "10:30",
        title: "Tridi Village",
        description: "Explore the 3D art village on the other side.",
      },
    ],
  },
  {
    id: 4,
    name: "Teluk Asmara",
    category: "Pantai",
    location: "Sumbermanjing Wetan",
    price: 25000,
    rating: 4.7,
    description:
      "Sering disebut sebagai Raja Ampat-nya Malang. Gugusan pulau karang kecil yang indah dengan ombak tenang. Cocok untuk camping dan menikmati ketenangan alam pantai selatan.",
    images: [
      "https://images.unsplash.com/photo-1510662145379-13537db782dc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=800",
    ],
    highlights: [
      { icon: "landscape", label: "Island Views" },
      { icon: "pool", label: "Safe Swimming" },
      { icon: "tent", label: "Camping Spot" },
      { icon: "wb_sunny", label: "Relaxing" },
    ],
    itinerary: [
      {
        time: "10:00",
        title: "Arrival",
        description: "Reach Teluk Asmara and set up your spot.",
      },
      {
        time: "12:00",
        title: "Beach Picnic",
        description: "Enjoy lunch with the view of the mini islands.",
      },
      {
        time: "14:00",
        title: "Island Hopping (Walk)",
        description: "During low tide, walk closer to the rock formations.",
      },
    ],
  },
  {
    id: 5,
    name: "Kayutangan Heritage",
    category: "Kota",
    location: "Jl. Basuki Rahmat, Kota Malang",
    price: 0,
    rating: 4.6,
    description:
      "Kawasan kota tua dengan nuansa vintage 1930-an. Nikmati kopi lokal dan suasana malam yang syahdu. Tempat terbaik untuk nostalgia Malang tempo dulu dengan bangunan kolonial yang terawat.",
    images: [
      "https://images.unsplash.com/photo-1533158674514-6330554c0e64?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1582913130094-0cf594d76f8e?auto=format&fit=crop&q=80&w=800", // Generic historic street
       "https://images.unsplash.com/photo-1596401057633-56565377f06d?auto=format&fit=crop&q=80&w=800", // Fallback
    ],
    highlights: [
      { icon: "history_edu", label: "Colonial Bldg" },
      { icon: "coffee", label: "Coffee Shops" },
      { icon: "music_note", label: "Live Music" },
      { icon: "camera", label: "Vintage Vibe" },
    ],
    itinerary: [
      {
        time: "19:00",
        title: "Evening Walk",
        description: "Stroll along the heritage street under the classic lamps.",
      },
      {
        time: "20:00",
        title: "Coffee Time",
        description: "Try the legendary 'Kopi O' at a local vintage cafe.",
      },
       {
        time: "21:00",
        title: "Live Music",
        description: "Enjoy street musicians performing classic hits.",
      },
    ],
  },
  {
    id: 6,
    name: "Air Terjun Coban Rondo",
    category: "Gunung",
    location: "Pujon, Malang",
    price: 40000,
    rating: 4.6,
    description:
      "Air terjun legendaris dengan wahana Taman Labirin yang seru. Udara sejuk dan asri. Salah satu air terjun paling mudah diakses di Malang dengan debit air yang deras sepanjang tahun.",
    images: [
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800",
       "https://images.unsplash.com/photo-1518709414768-a88986a45d5a?auto=format&fit=crop&q=80&w=800", // Generic waterfall
       "https://images.unsplash.com/photo-1546702755-22d76588b945?auto=format&fit=crop&q=80&w=800", // Generic nature
    ],
    highlights: [
      { icon: "water_drop", label: "Waterfall" },
      { icon: "park", label: "Labyrinth Park" },
      { icon: "forest", label: "Pine Forest" },
      { icon: "directions_bike", label: "Activities" },
    ],
    itinerary: [
      {
        time: "09:00",
        title: "Waterfall Trek",
        description: "Short walk to the base of the waterfall.",
      },
      {
        time: "10:30",
        title: "Labyrinth Challenge",
        description: "Try to find your way out of the hedge maze.",
      },
       {
        time: "12:00",
        title: "Flying Fox",
        description: "Optional adventure activities nearby.",
      },
    ],
  },
  {
    id: 7,
    name: "Malang Night Paradise",
    category: "Kota",
    location: "Singosari, Malang",
    price: 85000,
    rating: 4.5,
    description:
      "Wisata malam dengan lampion cantik dan wahana air Magic Journey seperti di Venesia. Destinasi keluarga modern dengan puluhan spot foto bercahaya dan wahana interaktif.",
    images: [
      "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1542385151-efd9000e8bc5?auto=format&fit=crop&q=80&w=800", // Generic night park
       "https://images.unsplash.com/photo-1577002540984-7a250320eeab?auto=format&fit=crop&q=80&w=800", // Lights
    ],
    highlights: [
      { icon: "lightbulb", label: "Lantern Garden" },
      { icon: "rowing", label: "Magic Journey" },
      { icon: "child_care", label: "Kids Zone" },
      { icon: "fastfood", label: "Food Court" },
    ],
    itinerary: [
      {
        time: "18:00",
        title: "Gate Open",
        description: "Enter the park as the lights turn on.",
      },
      {
        time: "19:00",
        title: "Magic Journey",
        description: "Take the boat ride through themed illuminated tunnels.",
      },
       {
        time: "20:30",
        title: "Photo Hunt",
        description: "Explore the various lantern installations.",
      },
    ],
  },
  {
    id: 8,
    name: "Pantai Tiga Warna",
    category: "Pantai",
    location: "Clungup Mangrove Conservation",
    price: 100000,
    rating: 4.9,
    description:
      "Kawasan konservasi dengan gradasi air laut 3 warna. Wajib reservasi, cocok untuk snorkeling. Dikelola dengan ketat untuk menjaga kelestarian koral dan kebersihan pantai.",
    images: [
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800",
       "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", // Snorkeling
       "https://images.unsplash.com/photo-1519046904884-53103b34b271?auto=format&fit=crop&q=80&w=800", // Coral
    ],
    highlights: [
      { icon: "scuba_diving", label: "Snorkeling" },
      { icon: "nature_people", label: "Conservation" },
      { icon: "forest", label: "Mangrove" },
      { icon: "water_full", label: "Crystal Water" },
    ],
    itinerary: [
      {
        time: "08:00",
        title: "Check Point",
        description: "Bag check at conservation post (no plastic trash allowed).",
      },
      {
        time: "09:00",
        title: "Trek to Beach",
        description: "Short hike through the mangrove forest.",
      },
       {
        time: "10:00",
        title: "Snorkeling",
        description: "Explore the coral reefs (guide required).",
      },
    ],
  },
];
