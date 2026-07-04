'use client';

import React, { useEffect, useState } from 'react';
import './todo.css';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

const STORAGE_KEY = 'todos_v1';

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTodos(JSON.parse(raw) as Todo[]);
    } catch (e) {
      console.error('Failed to load todos', e);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error('Failed to save todos', e);
    }
  }, [todos]);

  function addTodo(e?: React.FormEvent) {
    e?.preventDefault();
    const text = value.trim();
    if (!text) return;
    const newTodo: Todo = { id: uid(), text, completed: false, createdAt: Date.now() };
    setTodos((t) => [newTodo, ...t]);
    setValue('');
  }

  function toggleTodo(id: string) {
    setTodos((t) => t.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x)));
  }

  function startEdit(id: string) {
    const t = todos.find((x) => x.id === id);
    if (!t) return;
    setEditingId(id);
    setValue(t.text);
  }

  function saveEdit() {
    if (!editingId) return;
    const text = value.trim();
    if (!text) return;
    setTodos((t) => t.map((x) => (x.id === editingId ? { ...x, text } : x)));
    setEditingId(null);
    setValue('');
  }

  function cancelEdit() {
    setEditingId(null);
    setValue('');
  }

  function removeTodo(id: string) {
    setTodos((t) => t.filter((x) => x.id !== id));
  }

  function clearCompleted() {
    setTodos((t) => t.filter((x) => !x.completed));
  }

  const visible = todos.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed
  );

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="todo-wrap">
      <h3 className="todo-title">To‑Do</h3>

      <form onSubmit={editingId ? (e) => { e.preventDefault(); saveEdit(); } : addTodo} className="todo-form">
        <input
          className="todo-input"
          placeholder={editingId ? 'Edit todo...' : 'Add a new todo'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Todo text"
        />
        <div className="todo-actions">
          {editingId ? (
            <>
              <button type="button" onClick={saveEdit} className="btn btn-primary">Save</button>
              <button type="button" onClick={cancelEdit} className="btn">Cancel</button>
            </>
          ) : (
            <button type="submit" className="btn btn-primary">Add</button>
          )}
        </div>
      </form>

      <div className="todo-controls">
        <div className="todo-filter" role="tablist" aria-label="Filter todos">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
          <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
        </div>
        <div className="todo-meta">
          <span>{remaining} left</span>
          <button onClick={clearCompleted} className="btn small">Clear completed</button>
        </div>
      </div>

      <ul className="todo-list" aria-live="polite">
        {visible.length === 0 && <li className="empty">No todos — add one above.</li>}
        {visible.map((t) => (
          <li key={t.id} className={`todo-item ${t.completed ? 'done' : ''}`}>
            <label className="todo-left">
              <input type="checkbox" checked={t.completed} onChange={() => toggleTodo(t.id)} />
              <span className="todo-text">{t.text}</span>
            </label>
            <div className="todo-right">
              <button onClick={() => startEdit(t.id)} className="btn tiny">Edit</button>
              <button onClick={() => removeTodo(t.id)} className="btn tiny danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
