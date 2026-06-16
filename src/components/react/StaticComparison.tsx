import { useState, useEffect } from "react";

interface BundleInfo {
  htmlSize: string;
  jsSize: string;
  hydrationTime: string;
}

export default function StaticComparison() {
  const [activeTab, setActiveTab] = useState<"static" | "island" | "full">("static");
  const [info, setInfo] = useState<BundleInfo>({
    htmlSize: "---",
    jsSize: "---",
    hydrationTime: "---",
  });

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

  useEffect(() => {
    setInfo(data[activeTab]);
  }, [activeTab]);

  return (
    <div class="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <h3 class="text-lg font-semibold mb-4 text-purple-400">
        Performance Comparison
      </h3>
      <div class="flex gap-2 mb-6">
        {(["static", "island", "full"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            class={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {tab === "static"
              ? "Static HTML"
              : tab === "island"
              ? "With Island"
              : "Full React"}
          </button>
        ))}
      </div>
      <div class="space-y-3">
        <div class="flex justify-between items-center bg-gray-700/50 rounded-lg px-4 py-3">
          <span class="text-sm text-gray-400">HTML Size</span>
          <span class="text-sm font-mono text-white">{info.htmlSize}</span>
        </div>
        <div class="flex justify-between items-center bg-gray-700/50 rounded-lg px-4 py-3">
          <span class="text-sm text-gray-400">JavaScript Size</span>
          <span
            class={`text-sm font-mono ${
              info.jsSize === "0 KB" ? "text-green-400" : "text-yellow-400"
            }`}
          >
            {info.jsSize}
          </span>
        </div>
        <div class="flex justify-between items-center bg-gray-700/50 rounded-lg px-4 py-3">
          <span class="text-sm text-gray-400">Hydration Time</span>
          <span
            class={`text-sm font-mono ${
              info.hydrationTime === "0 ms"
                ? "text-green-400"
                : "text-yellow-400"
            }`}
          >
            {info.hydrationTime}
          </span>
        </div>
      </div>
      {activeTab === "static" && (
        <p class="mt-4 text-xs text-gray-500">
          Pure static HTML. No JavaScript sent to the client.
        </p>
      )}
      {activeTab === "island" && (
        <p class="mt-4 text-xs text-gray-500">
          Small interactive island. Only ~2KB of JS for that component.
        </p>
      )}
      {activeTab === "full" && (
        <p class="mt-4 text-xs text-gray-500">
          Full React SPA would ship the entire React runtime + all component JS.
        </p>
      )}
    </div>
  );
}
