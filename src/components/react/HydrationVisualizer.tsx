import { useState } from "react";

const bundleInfo = (
  <p class="mt-4 text-[11px] text-gray-500">
    Bundle size contribution: ~2KB (React runtime shared across islands)
  </p>
);

export default function HydrationVisualizer() {
  const [hydrated, setHydrated] = useState(false);

  return (
    <div
      class={`glass rounded-xl p-6 transition-all duration-500 ${
        hydrated ? "border-l-2 border-l-green-500" : "border-l-2 border-l-gray-600"
      }`}
    >
      <div class="flex items-center gap-3 mb-3">
        <span class={`w-2.5 h-2.5 rounded-full ${hydrated ? "bg-green-500 animate-pulse" : "bg-gray-500"}`} />
        <span class="text-sm font-mono text-gray-400">
          Status:{" "}
          <span class={hydrated ? "text-green-400" : "text-gray-500"}>
            {hydrated ? "Hydrated" : "Static HTML"}
          </span>
        </span>
      </div>
      <h3 class="font-heading text-base font-semibold text-white mb-2">
        Hydrated Island
      </h3>
      <p class="text-sm text-gray-400 mb-4">
        {hydrated
          ? "This component is now interactive! React event handlers are active."
          : "Click to simulate hydration and see the difference."}
      </p>
      <button
        onClick={() => setHydrated(true)}
        disabled={hydrated}
        class={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
          hydrated
            ? "bg-white/5 text-gray-500 cursor-not-allowed"
            : "btn-gradient text-white"
        }`}
      >
        {hydrated ? "Hydrated" : "Hydrate Me"}
      </button>
      {bundleInfo}
    </div>
  );
}
