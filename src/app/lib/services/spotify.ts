import {
  Seed,
  Recommendations,
  ApiErrorSpotify,
  SearchResults,
} from "@/types/types";
import { z } from "zod";

const base = "/api/spotify";

export const getSearch = async (value: string) => {
  const { error: parsingError } = z.string().max(30).safeParse(value);

  if (parsingError) {
    throw { status: 400, message: "Input parsing error" };
  }

  if (!value) return Promise.resolve(null);

  const q = new URLSearchParams({
    q: value,
    type: "artist,track",
    limit: "4",
  });

  const res = await fetch(base + "/search?" + q);

  const { data, error }: { data: SearchResults; error: ApiErrorSpotify } =
    await res.json();

  if (error) throw error;
  return data;
};

export const getRecommendations = async ({
  seed,
}: {
  seed: Seed | undefined | null;
}) => {
  if (!seed) return Promise.resolve(null);

  const { error: parsingError } = z
    .object({
      id: z.string(),
      name: z.string(),
      type: z.string(),
      artist: z.optional(z.string()),
      preview_url: z.optional(z.string()),
    })
    .or(z.null())
    .safeParse(seed);

  if (parsingError) {
    throw { status: 400, message: "Input parsing error" };
  }

  const q = new URLSearchParams({
    ...(seed.type === "track" && { seed_tracks: seed.id }),
    ...(seed.type === "artist" && { seed_artists: seed.id }),
    limit: "20",
  });

  const res = await fetch(base + "/recommendations?" + q);

  const { data, error }: { data: Recommendations; error: ApiErrorSpotify } =
    await res.json();

  if (error) throw error;

  return data;
};
