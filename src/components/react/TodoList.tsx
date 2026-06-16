import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn Astro fundamentals", done: true },
    { id: 2, text: "Understand islands architecture", done: false },
    { id: 3, text: "Build something awesome", done: false },
  ]);
  const [input, setInput] = useState("");

  function addTodo() {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), done: false },
    ]);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function removeTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div class="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <h3 class="text-lg font-semibold mb-4 text-purple-400">
        Interactive Todo List
      </h3>
      <div class="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a new todo..."
          class="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={addTodo}
          class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Add
        </button>
      </div>
      <ul class="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            class="flex items-center gap-3 bg-gray-700/50 rounded-lg px-3 py-2"
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
              class="w-4 h-4 accent-purple-500"
            />
            <span
              class={`flex-1 text-sm ${
                todo.done ? "line-through text-gray-500" : "text-gray-200"
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              class="text-red-400 hover:text-red-300 text-xs"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p class="mt-4 text-xs text-gray-500">
        Full client-side state managed by React. In Astro, only this island
        ships JavaScript.
      </p>
    </div>
  );
}
