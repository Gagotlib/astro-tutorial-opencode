import { useState } from "react";

const staticInfo = (
  <p class="mt-4 text-[11px] text-gray-500">
    This interactive island manages its own state. No global JS needed.
  </p>
);

function getInitialTheme(): boolean {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("theme") !== "light";
  }
  return true;
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(getInitialTheme);

  function toggle() {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }

  return (
    <div class="glass rounded-xl p-6 text-center">
      <h3 class="font-heading text-base font-semibold text-white mb-4">
        Theme Toggle
      </h3>
      <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4 border border-white/5">
        {dark ? (
          <svg class="w-7 h-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
        ) : (
          <svg class="w-7 h-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
        )}
      </div>
      <p class="text-gray-400 mb-3 text-sm">
        Current theme:{" "}
        <span class="font-semibold text-white">{dark ? "Dark" : "Light"}</span>
      </p>
      <p class="text-xs text-gray-500 mb-4">
        {dark
          ? "The rest of the page stays in dark mode."
          : "Light mode activated!"}
      </p>
      <button
        onClick={toggle}
        class={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
          dark
            ? "btn-gradient"
            : "btn-ghost text-gray-300"
        }`}
      >
        {dark ? "Switch to Light" : "Switch to Dark"}
      </button>
      {staticInfo}
    </div>
  );
}
