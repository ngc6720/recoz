import { getUsername } from "@/app/lib/utils/spotify";

export async function GET() {
  const username = await getUsername();
  return Response.json({ username });
}
