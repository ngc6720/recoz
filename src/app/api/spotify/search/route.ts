import { NextRequest } from "next/server";
import { transferRequest, makeError } from "@/app/lib/utils/spotify";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const res = await transferRequest("search?", request.nextUrl.searchParams);
  if (!res.ok) return Response.json({ error: makeError(res) });

  const data = await res.json();

  const { data: parsedData, error: parsingError } = schema.safeParse(data);

  if (parsingError) {
    return Response.json({
      error: { status: 500, message: "Failed api data parsing" },
    });
  }

  return Response.json({ data: parsedData });
}

const seedSchema = z.object({
  id: z.string(),
  type: z.string(),
  name: z.string(),
  artists: z.array(z.object({ name: z.string() })).optional(),
  preview_url: z.union([z.string(), z.null()]).optional(),
});

const schema = z
  .object({
    tracks: z.object({
      items: z.array(seedSchema),
    }),
    artists: z.object({
      items: z.array(seedSchema),
    }),
  })
  .transform((data) =>
    [...data.tracks.items, ...data.artists.items].map(
      ({ id, type, name, artists, preview_url }) => ({
        type,
        id,
        name,
        ...(artists && { artist: artists[0].name }),
        ...(preview_url && { preview_url: preview_url }),
      })
    )
  );
export type output = z.output<typeof schema>;
