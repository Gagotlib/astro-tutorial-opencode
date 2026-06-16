import type { AstroCookies } from "astro";

const SESSION_COOKIE = "session";
const USERS = [
  { username: "demo", password: "password123", name: "Demo User" },
  { username: "admin", password: "password123", name: "Admin" },
];

export interface SessionUser {
  username: string;
  name: string;
}

export function login(username: string, password: string): SessionUser | null {
  const user = USERS.find(
    (u) => u.username === username && u.password === password,
  );
  if (!user) return null;
  return { username: user.username, name: user.name };
}

export function setSessionCookie(
  cookies: AstroCookies,
  user: SessionUser,
): void {
  const data = Buffer.from(JSON.stringify(user)).toString("base64");
  cookies.set(SESSION_COOKIE, data, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });
}

export function getSession(cookies: AstroCookies): SessionUser | null {
  const data = cookies.get(SESSION_COOKIE);
  if (!data?.value) return null;
  try {
    return JSON.parse(Buffer.from(data.value, "base64").toString("utf-8"));
  } catch {
    return null;
  }
}

export function clearSession(cookies: AstroCookies): void {
  cookies.delete(SESSION_COOKIE, { path: "/" });
}
