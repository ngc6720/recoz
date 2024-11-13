import { output as SearchResults } from "@/app/api/spotify/search/route";
import { output as Recommendations } from "@/app/api/spotify/recommendations/route";

export type { SearchResults, Recommendations };

export type Seed = SearchResults[number];
export type Track = Recommendations[number];
export type TrackWithSound = Track & {
  sound: Howl;
};

export interface ApiErrorSpotify {
  status: number;
  message: string;
  retryAfter?: string;
}
