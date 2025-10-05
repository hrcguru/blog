import { getDb } from "@/lib/mongodb";
import { verifyAuth } from "@/lib/verifyAuth";

// GET all posts (or category-wise)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const db = await getDb();
    const query = category ? { category } : {};

    const posts = await db.collection("posts")
      .find(query)
      .project({ title: 1, category: 1, excerpt: 1, readTime: 1 })
      .sort({ _id: -1 })
      .toArray();

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), { status: 500 });
  }
}

// POST create blog (protected)
export async function POST(request) {
  const user = verifyAuth(request);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const body = await request.json();
    const db = await getDb();

    const doc = {
  title: body.title,
  category: body.category,
  excerpt: body.excerpt || "",
  content: body.content || "",
  readTime: body.readTime || 5,
  likes: 0,            // 👈 ensure default
  comments: [],        // 👈 ensure default
  createdAt: new Date()
};

    const r = await db.collection("posts").insertOne(doc);
    return new Response(JSON.stringify({ _id: r.insertedId, ...doc }), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to create post" }), { status: 500 });
  }
}
