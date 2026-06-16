import { useState } from "react";

export default function LoginForm({ returnUrl = "/dashboard" }: { returnUrl?: string }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      window.location.href = returnUrl;
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      class="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md mx-auto"
    >
      <h2 class="text-2xl font-bold mb-6 text-center text-purple-400">
        Demo Login
      </h2>
      <p class="text-sm text-gray-400 mb-6 text-center">
        Use any username with password: <code class="text-purple-300">password123</code>
      </p>
      {error && (
        <div class="bg-red-500/10 border border-red-500 text-red-400 rounded-lg px-4 py-2 mb-4 text-sm">
          {error}
        </div>
      )}
      <div class="space-y-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1" for="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1" for="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          class="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-2 rounded-lg font-medium transition-colors"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
