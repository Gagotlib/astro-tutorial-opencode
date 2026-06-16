import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
  const data = {
    message: "Hello from Astro API endpoint!",
    timestamp: new Date().toISOString(),
    framework: "Astro",
    note: "This is equivalent to a Next.js Route Handler in app/api/hello/route.ts",
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
