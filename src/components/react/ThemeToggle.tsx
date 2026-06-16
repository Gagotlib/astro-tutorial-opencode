import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center">
      <h3 class="text-lg font-semibold mb-4 text-purple-400">
        Theme Toggle Island
      </h3>
      <p class="text-gray-400 mb-4">
        Current theme:{" "}
        <span class="font-semibold text-white">{dark ? "Dark" : "Light"}</span>
      </p>
      {dark ? (
        <p class="text-sm text-gray-500 mb-4">
          The rest of the page stays in dark mode. In a real app, you'd control
          this with CSS variables.
        </p>
      ) : (
        <p class="text-sm text-yellow-400 mb-4">
          Light mode activated! This island toggles independently.
        </p>
      )}
      <button
        onClick={() => setDark((d) => !d)}
        class={`px-6 py-2 rounded-lg font-medium transition-colors ${
          dark
            ? "bg-yellow-500 hover:bg-yellow-600 text-black"
            : "bg-gray-700 hover:bg-gray-600 text-white"
        }`}
      >
        {dark ? "Switch to Light" : "Switch to Dark"}
      </button>
      <p class="mt-4 text-xs text-gray-500">
        This interactive island manages its own state. No global JS needed.
      </p>
    </div>
  );
}
