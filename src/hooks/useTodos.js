import { useState, useEffect } from 'react'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem('todos')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function useTodos() {
  const [todos, setTodos] = useState(loadFromStorage)

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos))
    } catch {
      // quota exceeded — ignore
    }
  }, [todos])

  function addTodo(text) {
    if (!text.trim()) return
    setTodos(prev => [...prev, { id: crypto.randomUUID(), text: text.trim(), completed: false }])
  }

  function toggleTodo(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  return { todos, addTodo, toggleTodo, deleteTodo }
}
