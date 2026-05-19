import { useState } from 'react'

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('')

  function submit() {
    if (!text.trim()) return
    onAdd(text)
    setText('')
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit()}
        placeholder="Add a task..."
        style={{ flex: 1, padding: '0.4rem' }}
      />
      <button onClick={submit}>Add</button>
    </div>
  )
}
