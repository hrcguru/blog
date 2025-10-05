import { addLike } from "@/lib/models/Post";

export async function POST(req, { params }) {
  try {
    const updated = await addLike(params.id);
    return new Response(JSON.stringify({ likes: updated.likes }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to like post" }), { status: 500 });
  }
}
