import { Colors } from "@/theme";

export interface Founder {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface Job {
  title: string;
  compensation: string;
}

export interface StartupDetails {
  id: string;
  name: string;
  batch: string;
  category: string;
  location: string;
  hiring: boolean;
  logo: string;
  logoBg: string;
  tagline: string;
  description: string;
  teamSize: string;
  funding: string;
  founded: string;
  country: string;
  founders: Founder[];
  jobs: Job[];
  officeName: string;
  officeAddress: string;
  website: string;
  heroImage: string;
}

export const startupDetailsData: Record<string, StartupDetails> = {
  "1": {
    id: "1",
    name: "Stripe",
    batch: "S09",
    category: "Fintech",
    location: "San Francisco, CA",
    hiring: true,
    logo: "S",
    logoBg: Colors.appColors.brandStripe,
    tagline: "Financial infrastructure platform for the internet.",
    description:
      "Stripe is a financial infrastructure platform for the internet. Millions of companies—from the world's largest enterprises to the most ambitious startups—use Stripe to accept payments, grow their revenue, and accelerate new business opportunities.",
    teamSize: "8,000+",
    funding: "$8.7B",
    founded: "2010",
    country: "USA",
    founders: [
      {
        name: "Patrick Collison",
        role: "Co-founder & CEO",
        bio: "Co-founded Stripe in 2010. Previously co-founded Auctomatic.",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
      },
      {
        name: "John Collison",
        role: "Co-founder & President",
        bio: "Co-founded Stripe in 2010. Previously studied at Harvard.",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120",
      },
    ],
    jobs: [
      {
        title: "Staff Software Engineer, Payments",
        compensation: "$220k – $280k • 0.15% Equity",
      },
      {
        title: "Product Designer, Billing",
        compensation: "$160k – $210k • 0.08% Equity",
      },
    ],
    officeName: "San Francisco HQ",
    officeAddress: "South of Market, San Francisco, CA",
    website: "https://stripe.com",
    heroImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600&h=300",
  },
  "2": {
    id: "2",
    name: "Airbnb",
    batch: "W09",
    category: "Travel",
    location: "San Francisco, CA",
    hiring: false,
    logo: "A",
    logoBg: Colors.appColors.brandAirbnb,
    tagline: "Online marketplace for homestays and experiences worldwide.",
    description:
      "Airbnb operates an online marketplace for lodging, primarily homestays for vacation rentals, and tourism activities. Based in San Francisco, California, the platform is accessible via website and mobile app.",
    teamSize: "6,000+",
    funding: "$6.4B",
    founded: "2008",
    country: "USA",
    founders: [
      {
        name: "Brian Chesky",
        role: "Co-founder & CEO",
        bio: "Co-founder and CEO. Industrial design graduate from RISD.",
        avatar:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120",
      },
      {
        name: "Joe Gebbia",
        role: "Co-founder & Chairman",
        bio: "Co-founder and Chairman of Airbnb.org. RISD graduate.",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120",
      },
    ],
    jobs: [
      {
        title: "Senior Frontend Engineer, Guest",
        compensation: "$190k – $240k • 0.12% Equity",
      },
    ],
    officeName: "San Francisco HQ",
    officeAddress: "888 Brannan St, San Francisco, CA",
    website: "https://airbnb.com",
    heroImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600&h=300",
  },
  "3": {
    id: "3",
    name: "OpenAI",
    batch: "W21",
    category: "AI",
    location: "San Francisco, CA",
    hiring: true,
    logo: "O",
    logoBg: Colors.appColors.brandOpenAI,
    tagline: "AI research and deployment company behind ChatGPT and DALL-E.",
    description:
      "OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence (AGI)—by which we mean highly autonomous systems that outperform humans at most economically valuable work—benefits all of humanity.",
    teamSize: "500+",
    funding: "$13B",
    founded: "2015",
    country: "USA",
    founders: [
      {
        name: "Sam Altman",
        role: "Co-founder & CEO",
        bio: "Previously president of Y Combinator and co-founder of Loopt.",
        avatar:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120&h=120",
      },
      {
        name: "Greg Brockman",
        role: "Co-founder & President",
        bio: "Formerly CTO of Stripe.",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120",
      },
    ],
    jobs: [
      {
        title: "Senior React Native Developer",
        compensation: "$180k – $250k • 0.1% Equity",
      },
      {
        title: "Lead AI Engineer",
        compensation: "$200k – $300k • 0.2% Equity",
      },
    ],
    officeName: "San Francisco HQ",
    officeAddress: "Mission District, San Francisco, CA",
    website: "https://openai.com",
    heroImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600&h=300",
  },
};
