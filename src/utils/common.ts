import { Colors } from "@/theme";

// Determines avatar initial text and background tint colors based on entity name.
export const getAvatarTheme = (name: string) => {
  const char = (name || "").charAt(0).toUpperCase();
  const code = char.charCodeAt(0) || 0;

  const themes = [
    { bg: "rgba(255, 102, 0, 0.08)", text: Colors.appColors.primary }, // YC Orange tint
    { bg: "rgba(46, 125, 50, 0.08)", text: "#2E7D32" }, // Green tint
    { bg: "rgba(13, 71, 161, 0.08)", text: "#0D47A1" }, // Blue tint
    { bg: "rgba(74, 20, 140, 0.08)", text: "#4A148C" }, // Purple tint
    { bg: "rgba(245, 127, 23, 0.08)", text: "#F57F17" }, // Amber tint
    { bg: "rgba(0, 96, 100, 0.08)", text: "#006064" }, // Cyan tint
    { bg: "rgba(216, 67, 21, 0.08)", text: "#D84315" }, // Coral tint
    { bg: "rgba(26, 35, 126, 0.08)", text: "#1A237E" }, // Indigo tint
  ];

  return themes[code % themes.length];
};

// Formatting utility for funding USD
export const formatUSD = (val?: number | null) => {
  if (val == null) return "N/A";
  if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
  if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
  if (val >= 1e3) return `$${(val / 1e3).toFixed(0)}K`;
  return `$${val}`;
};

// Helper for industry cover photo mapping
export const getHeroImage = (industry?: string) => {
  const ind = (industry || "").toLowerCase();
  if (
    ind.includes("real estate") ||
    ind.includes("construction") ||
    ind.includes("infrastructure")
  ) {
    return "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800&h=400";
  }
  if (
    ind.includes("health") ||
    ind.includes("biotech") ||
    ind.includes("medical") ||
    ind.includes("dental") ||
    ind.includes("healthcare")
  ) {
    return "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=800&h=400";
  }
  if (
    ind.includes("finance") ||
    ind.includes("fintech") ||
    ind.includes("crypto") ||
    ind.includes("invest")
  ) {
    return "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800&h=400";
  }
  if (
    ind.includes("ai") ||
    ind.includes("artificial") ||
    ind.includes("software") ||
    ind.includes("technology") ||
    ind.includes("data")
  ) {
    return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=400";
  }
  return "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800&h=400";
};
