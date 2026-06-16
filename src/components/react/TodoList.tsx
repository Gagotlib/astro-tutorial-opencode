import { useState } from "react"

interface Todo {
  id: number
  text: string
  done: boolean
}

const todoInfo = (
  <p className="mt-4 text-[11px] text-gray-500">
    Full client-side state managed by React. Only this island ships JavaScript.
  </p>
)

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn Astro fundamentals", done: true },
    { id: 2, text: "Understand islands architecture", done: false },
    { id: 3, text: "Build something awesome", done: false },
  ])
  const [input, setInput] = useState("")

  function addTodo() {
    if (!input.trim()) return
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), done: false },
    ])
    setInput("")
  }

  function toggleTodo(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function removeTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="font-heading text-base font-semibold text-white mb-4">
        Interactive Todo List
      </h3>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a new todo..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-astro-purple/40 transition-colors"
        />
        <button
          onClick={addTodo}
          className="btn-gradient px-4 py-2 rounded-xl text-sm text-white"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 bg-white/[0.03] rounded-xl px-3 py-2.5 border border-white/5"
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4 accent-astro-purple rounded"
            />
            <span
              className={`flex-1 text-sm ${todo.done ? "line-through text-gray-500" : "text-gray-200"
                }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="text-red-400/70 hover:text-red-400 text-xs transition-colors"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {todoInfo}
    </div>
  )
}
