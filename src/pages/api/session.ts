import type { APIRoute } from "astro";
import { getSession } from "../../lib/auth";

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const user = getSession(cookies);

  return new Response(JSON.stringify({ authenticated: !!user, user }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
