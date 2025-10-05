import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { verifyAuth } from "@/lib/verifyAuth";

// GET single post
export async function GET(request, { params }) {
  try {
    const db = await getDb();
    const post = await db.collection("posts").findOne({ _id: new ObjectId(params.id) });

    if (!post) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to fetch post" }), { status: 500 });
  }
}

// PUT update post (protected)
export async function PUT(request, { params }) {
  const user = verifyAuth(request);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const body = await request.json();
    const db = await getDb();

    const update = {
      $set: {
        title: body.title,
        category: body.category,
        excerpt: body.excerpt,
        content: body.content,
        readTime: body.readTime,
        updatedAt: new Date(),
      },
    };

    const result = await db.collection("posts").updateOne(
      { _id: new ObjectId(params.id) },
      update
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to update post" }), { status: 500 });
  }
}

// DELETE post (protected)
export async function DELETE(request, { params }) {
  const user = verifyAuth(request);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const db = await getDb();
    const result = await db.collection("posts").deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to delete post" }), { status: 500 });
  }
}
