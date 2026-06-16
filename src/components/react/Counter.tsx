import { useState } from "react"

const infoParagraph = (
  <p className="mt-4 text-[11px] text-gray-500">
    This component is hydrated on the client. Without <code className="text-astro-cyan font-mono">client:load</code>, it would be static HTML.
  </p>
)

export default function Counter({ initial = 0 }: { initial?: number }) {
  const [count, setCount] = useState(initial)

  return (
    <div className="glass rounded-xl p-6 text-center">
      <h3 className="font-heading text-base font-semibold text-white mb-4">
        Interactive Counter
      </h3>
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-astro-purple/20 to-astro-pink/20 flex items-center justify-center mx-auto mb-5 border border-white/5">
        <span className="text-3xl font-bold font-heading text-white">{count}</span>
      </div>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="btn-ghost px-5 py-2 rounded-xl text-sm text-gray-300"
        >
          - Decrease
        </button>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="btn-gradient px-5 py-2 rounded-xl text-sm text-white"
        >
          + Increase
        </button>
      </div>
      {infoParagraph}
    </div>
  )
}
