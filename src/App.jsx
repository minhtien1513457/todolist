import useTodos from './hooks/useTodos'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos()

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>Todo List</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}
