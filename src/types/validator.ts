import { Company } from "./hiring";

export interface SimilarCompany extends Company {
  similarity_score: number;
}

export interface BatchCount {
  batch: string;
  count: number;
}

export interface ValidationResult {
  similar_companies: SimilarCompany[];
  total_similar: number;
  market_indicator: 'green' | 'yellow' | 'crowded';
  market_analysis: string;
  industry_breakdown: Record<string, number>;
  batch_timeline: BatchCount[];
  market_size_percentage: number;
}
