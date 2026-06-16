import type { APIRoute } from "astro";
import { login, setSessionCookie } from "../../lib/auth";

export const prerender = false;

function validateInput(value: unknown, type: "string", maxLength: number): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= maxLength;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!validateInput(username, "string", 100) || !validateInput(password, "string", 100)) {
      return new Response(
        JSON.stringify({ error: "Username and password are required (max 100 characters)" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const user = login(username, password);

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid username or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    setSessionCookie(cookies, user);

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body. Expected JSON with username and password." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
};
