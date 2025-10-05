import { getDb } from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const db = await getDb();

    const doc = {
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      createdAt: new Date(),
    };

    await db.collection("contacts").insertOne(doc);

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Failed to send message" }), { status: 500 });
  }
}

// ✅ Admin-only: Fetch all contact messages
export async function GET(request) {
  try {
    const db = await getDb();
    const messages = await db.collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Failed to fetch messages" }), { status: 500 });
  }
}
