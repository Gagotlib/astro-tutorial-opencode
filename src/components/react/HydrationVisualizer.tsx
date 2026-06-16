import { useState } from "react";

export default function HydrationVisualizer() {
  const [hydrated, setHydrated] = useState(false);

  return (
    <div
      class={`border-2 rounded-xl p-6 transition-all duration-500 ${
        hydrated
          ? "border-green-500 bg-green-500/10"
          : "border-gray-600 bg-gray-800"
      }`}
    >
      <div class="flex items-center gap-3 mb-3">
        <div
          class={`w-3 h-3 rounded-full ${
            hydrated ? "bg-green-500 animate-pulse" : "bg-gray-500"
          }`}
        />
        <span class="text-sm font-mono">
          Status:{" "}
          <span class={hydrated ? "text-green-400" : "text-gray-400"}>
            {hydrated ? "Hydrated" : "Static HTML"}
          </span>
        </span>
      </div>
      <h3 class="text-lg font-semibold mb-2">Hydrated Island</h3>
      <p class="text-sm text-gray-400 mb-4">
        {hydrated
          ? "This component is now interactive! React event handlers are active."
          : "Click to simulate hydration and see the difference."}
      </p>
      <button
        onClick={() => setHydrated(true)}
        disabled={hydrated}
        class={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          hydrated
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 text-white"
        }`}
      >
        {hydrated ? "Hydrated" : "Hydrate Me"}
      </button>
      <p class="mt-4 text-xs text-gray-500">
        Bundle size contribution: ~2KB (React runtime shared across islands)
      </p>
    </div>
  );
}
