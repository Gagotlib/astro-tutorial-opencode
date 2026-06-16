import { useState } from "react";

interface BundleInfo {
  htmlSize: string;
  jsSize: string;
  hydrationTime: string;
}

const tabs = [
  { key: "static" as const, label: "Static HTML" },
  { key: "island" as const, label: "With Island" },
  { key: "full" as const, label: "Full React" },
];

export default function StaticComparison() {
  const [activeTab, setActiveTab] = useState<"static" | "island" | "full">("static");

  const data: Record<string, BundleInfo> = {
    static: {
      htmlSize: "4.2 KB",
      jsSize: "0 KB",
      hydrationTime: "0 ms",
    },
    island: {
      htmlSize: "4.5 KB",
      jsSize: "2.1 KB",
      hydrationTime: "15 ms",
    },
    full: {
      htmlSize: "4.5 KB",
      jsSize: "48 KB",
      hydrationTime: "120 ms",
    },
  };

  const info = data[activeTab];

  return (
    <div class="glass rounded-xl p-6">
      <h3 class="font-heading text-base font-semibold text-white mb-4">
        Performance Comparison
      </h3>
      <div class="flex gap-2 mb-5 bg-white/[0.03] rounded-xl p-1 border border-white/5">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            class={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === key
                ? "bg-gradient-to-r from-astro-purple to-astro-pink text-white shadow-lg shadow-astro-purple/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div class="space-y-2">
        <div class="flex justify-between items-center bg-white/[0.03] rounded-xl px-4 py-3 border border-white/5">
          <span class="text-sm text-gray-400">HTML Size</span>
          <span class="text-sm font-mono text-white">{info.htmlSize}</span>
        </div>
        <div class="flex justify-between items-center bg-white/[0.03] rounded-xl px-4 py-3 border border-white/5">
          <span class="text-sm text-gray-400">JavaScript Size</span>
          <span
            class={`text-sm font-mono ${
              info.jsSize === "0 KB" ? "text-green-400" : "text-yellow-400"
            }`}
          >
            {info.jsSize}
          </span>
        </div>
        <div class="flex justify-between items-center bg-white/[0.03] rounded-xl px-4 py-3 border border-white/5">
          <span class="text-sm text-gray-400">Hydration Time</span>
          <span
            class={`text-sm font-mono ${
              info.hydrationTime === "0 ms" ? "text-green-400" : "text-yellow-400"
            }`}
          >
            {info.hydrationTime}
          </span>
        </div>
      </div>
      <p class="mt-3 text-xs text-gray-500">
        {activeTab === "static" && "Pure static HTML. Zero JS sent to the client."}
        {activeTab === "island" && "Small interactive island. Only ~2KB of JS for that component."}
        {activeTab === "full" && "Full React SPA ships the entire React runtime + all component JS."}
      </p>
    </div>
  );
}
