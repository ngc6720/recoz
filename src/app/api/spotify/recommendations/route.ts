import { NextRequest } from "next/server";
import { transferRequest, makeError } from "@/app/lib/utils/spotify";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const res = await transferRequest(
    "recommendations?",
    request.nextUrl.searchParams
  );

  if (!res.ok) {
    return Response.json({ error: makeError(res) });
  }

  const data = await res.json();

  const { data: parsedData, error: parsingError } = schema.safeParse(data);

  if (parsingError) {
    return Response.json({
      error: { status: 500, message: "Failed api data parsing" },
    });
  }

  return Response.json({ data: parsedData });
}

const schema = z
  .object({
    tracks: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        preview_url: z.union([z.string(), z.null()]),
        artists: z.array(z.object({ name: z.string() })),
      })
    ),
  })
  .transform((data) =>
    data.tracks
      .filter((track) => track.preview_url !== null)
      .map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        preview_url: track.preview_url,
      }))
  );

export type output = z.output<typeof schema>;
