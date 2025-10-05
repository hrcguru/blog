import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ✅ GET → fetch all comments
export async function GET(req, { params }) {
  try {
    const db = await getDb();
    const postId = params.id;

    const post = await db.collection("posts").findOne(
      { _id: new ObjectId(postId) },
      { projection: { comments: 1 } }
    );

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(post.comments || []), { status: 200 });
  } catch (err) {
    console.error("Comment fetch error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch comments" }), { status: 500 });
  }
}

// ✅ POST → add a comment
export async function POST(req, { params }) {
  try {
    const body = await req.json();
    const db = await getDb();
    const postId = params.id;

    // 👇 assign a unique _id to each comment
    const newComment = {
      _id: new ObjectId(),
      user: body.user || "Anonymous",
      text: body.text,
      createdAt: new Date(),
    };

    await db.collection("posts").updateOne(
      { _id: new ObjectId(postId) },
      { $push: { comments: newComment } }
    );

    // Return updated comments
    const updated = await db.collection("posts").findOne(
      { _id: new ObjectId(postId) },
      { projection: { comments: 1 } }
    );

    return new Response(JSON.stringify(updated.comments), { status: 200 });
  } catch (err) {
    console.error("Comment add error:", err);
    return new Response(JSON.stringify({ error: "Failed to add comment" }), { status: 500 });
  }
}

// ✅ DELETE → remove a comment
export async function DELETE(req, { params }) {
  try {
    const db = await getDb();
    const postId = params.id;

    const { commentId } = await req.json(); // 👈 client must send { "commentId": "..." }

    if (!commentId) {
      return new Response(JSON.stringify({ error: "Comment ID required" }), { status: 400 });
    }

    const result = await db.collection("posts").updateOne(
      { _id: new ObjectId(postId) },
      { $pull: { comments: { _id: new ObjectId(commentId) } } }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ error: "Comment not found" }), { status: 404 });
    }

    const updated = await db.collection("posts").findOne(
      { _id: new ObjectId(postId) },
      { projection: { comments: 1 } }
    );

    return new Response(JSON.stringify(updated.comments), { status: 200 });
  } catch (err) {
    console.error("Delete comment error:", err);
    return new Response(JSON.stringify({ error: "Failed to delete comment" }), { status: 500 });
  }
}
