import { Colors, Images } from "@/theme";

export const trendingStartups = [
  {
    id: "1",
    logo: "S",
    logoBg: Colors.appColors.brandStripe,
    name: "Stripe",
    batch: "S09 • 🇺🇸",
    description:
      "Financial infrastructure platform for the internet. Payments, billing, and more.",
    category: "Fintech",
    bookmarked: true,
  },
  {
    id: "2",
    logo: "A",
    logoBg: Colors.appColors.brandAirbnb,
    name: "Airbnb",
    batch: "W09 • 🇺🇸",
    description:
      "Online marketplace for short-term homestays and experiences worldwide.",
    category: "Travel",
    bookmarked: false,
  },
  {
    id: "3",
    logo: "O",
    logoBg: Colors.appColors.brandOpenAI,
    name: "OpenAI",
    batch: "W21 • 🇺🇸",
    description:
      "AI research and deployment company behind ChatGPT and DALL-E.",
    category: "AI",
    bookmarked: false,
  },
];

export const statistics = [
  {
    id: "1",
    count: "5017",
    label: "Companies",
    icon: Images.building,
    color: Colors.appColors.brandBlue,
  },
  {
    id: "2",
    count: "1188",
    label: "Hiring",
    icon: Images.briefcase,
    color: Colors.appColors.brandGreen,
  },
  {
    id: "3",
    count: "60+",
    label: "Countries",
    icon: Images.globe,
    color: Colors.appColors.brandYellow,
  },
  {
    id: "4",
    count: "100+",
    label: "Industries",
    icon: Images.category,
    color: Colors.appColors.brandRed,
  },
];

export const countries = [
  "🇺🇸 USA",
  "🇮🇳 India",
  "🇬🇧 UK",
  "🇨🇦 Canada",
  "🇫🇷 France",
  "🇸🇬 Singapore",
];

export const industries = [
  { emoji: "🤖", name: "AI", count: "1,245 Companies" },
  { emoji: "💳", name: "Fintech", count: "850 Companies" },
  { emoji: "🩺", name: "Healthcare", count: "430 Companies" },
  { emoji: "🧑‍💻", name: "Dev Tools", count: "310 Companies" },
  { emoji: "🌱", name: "Climate", count: "215 Companies" },
  { emoji: "📚", name: "Education", count: "180 Companies" },
  { emoji: "🔒", name: "Security", count: "150 Companies" },
  { emoji: "🏢", name: "B2B", count: "920 Companies" },
];
