import { useState } from "react";

export default function Counter({ initial = 0 }: { initial?: number }) {
  const [count, setCount] = useState(initial);

  return (
    <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center">
      <h3 class="text-lg font-semibold mb-4 text-purple-400">
        Interactive Counter Island
      </h3>
      <p class="text-5xl font-bold mb-6 text-white">{count}</p>
      <div class="flex gap-3 justify-center">
        <button
          onClick={() => setCount((c) => c - 1)}
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
        >
          - Decrease
        </button>
        <button
          onClick={() => setCount((c) => c + 1)}
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
        >
          + Increase
        </button>
      </div>
      <p class="mt-4 text-xs text-gray-500">
        This component is hydrated on the client. Without client:load, it would
        be static HTML.
      </p>
    </div>
  );
}
