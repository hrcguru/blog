import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { user: username },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      return new Response(JSON.stringify({ token }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Login failed" }), { status: 500 });
  }
}
