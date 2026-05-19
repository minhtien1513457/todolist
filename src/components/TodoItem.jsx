export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button aria-label="Delete" onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  )
}
