import { output as Seed } from "@/app/api/spotify/search/route";
import { output as Recommendations } from "@/app/api/spotify/recommendations/route";

export type { Seed, Recommendations };

export interface ApiErrorSpotify {
  status: number;
  message: string;
  retryAfter?: string;
}
