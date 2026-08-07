import { SimilarCompany } from "./validator";

export interface PredictionResult {
  prediction_id: string;
  idea_score: number;
  team_score?: number;
  market_score: number;
  combined_score: number;
  percentile: number;
  tier: string;
  similar_companies: SimilarCompany[];
  achievements: Achievement[];
  challenges: any[];
  leaderboard_position: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface PredictorPayload {
  idea_description: string;
  industry?: string;
  market_type?: string;
  location?: string;
  founder_info?: string;
  max_matches?: number;
}
