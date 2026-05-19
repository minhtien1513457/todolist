import { renderHook, act } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import useTodos from './useTodos'

beforeEach(() => {
  localStorage.clear()
})

describe('useTodos', () => {
  it('starts with an empty list when localStorage is empty', () => {
    const { result } = renderHook(() => useTodos())
    expect(result.current.todos).toEqual([])
  })

  it('adds a todo', () => {
    const { result } = renderHook(() => useTodos())
    act(() => { result.current.addTodo('Buy milk') })
    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Buy milk')
    expect(result.current.todos[0].completed).toBe(false)
    expect(typeof result.current.todos[0].id).toBe('string')
  })

  it('ignores empty or whitespace-only text in addTodo', () => {
    const { result } = renderHook(() => useTodos())
    act(() => { result.current.addTodo('   ') })
    expect(result.current.todos).toHaveLength(0)
  })

  it('toggles a todo completed state', () => {
    const { result } = renderHook(() => useTodos())
    act(() => { result.current.addTodo('Buy milk') })
    const id = result.current.todos[0].id
    act(() => { result.current.toggleTodo(id) })
    expect(result.current.todos[0].completed).toBe(true)
    act(() => { result.current.toggleTodo(id) })
    expect(result.current.todos[0].completed).toBe(false)
  })

  it('deletes a todo', () => {
    const { result } = renderHook(() => useTodos())
    act(() => { result.current.addTodo('Buy milk') })
    const id = result.current.todos[0].id
    act(() => { result.current.deleteTodo(id) })
    expect(result.current.todos).toHaveLength(0)
  })

  it('persists todos to localStorage on change', () => {
    const { result } = renderHook(() => useTodos())
    act(() => { result.current.addTodo('Buy milk') })
    const stored = JSON.parse(localStorage.getItem('todos'))
    expect(stored).toHaveLength(1)
    expect(stored[0].text).toBe('Buy milk')
  })

  it('loads todos from localStorage on mount', () => {
    localStorage.setItem('todos', JSON.stringify([
      { id: 'abc', text: 'Pre-existing', completed: false }
    ]))
    const { result } = renderHook(() => useTodos())
    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Pre-existing')
  })

  it('falls back to empty array if localStorage contains invalid JSON', () => {
    localStorage.setItem('todos', 'not-json')
    const { result } = renderHook(() => useTodos())
    expect(result.current.todos).toEqual([])
  })
})
