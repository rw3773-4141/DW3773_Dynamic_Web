// GET belongs in useEffect with [] because the component body runs on every
// render. Calling GET there and then setting state would start a fetch loop.
// If setTodos ran before await in deleteTodoById, the row would disappear even
// when the server was down. The delete would fail and it would return on refresh.
// The filter needs no request because all todos are already in React state;
// filter() picks which of those saved todos to show on the screen.
import {useEffect, useState} from 'react'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import {
  fetchTodos,
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  updateTodo as updateTodoRequest,
  patchTodo as patchTodoRequest,
} from './api'

const App = () => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const savedTodos = await fetchTodos()
        setTodos(savedTodos)
      } catch (err) {
        console.error(err)
        setError('Could not reach the server. Is npm run server running?')
      } finally {
        setIsLoading(false)
      }
    }
    loadTodos()
  }, [])

  const createTodo = async (title) => {
    try {
      const newTodo = await createTodoRequest(title)
      setTodos((current) => [...current, newTodo])
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not add the todo. Check that the server is running.')
      throw err
    }
  }

  const deleteTodoById = async (id) => {
    try {
      await deleteTodoRequest(id)
      setTodos((current) => current.filter((todo) => todo.id !== id))
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not delete the todo. Please try again.')
    }
  }

  const editTodoById = async (id, newTitle) => {
    const todo = todos.find((item) => item.id === id)
    if (!todo) return

    try {
      const updated = await updateTodoRequest({...todo, title: newTitle})
      setTodos((current) => current.map((item) => item.id === id ? updated : item))
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not save the edit. Please try again.')
      throw err
    }
  }

  const toggleTodoById = async (id) => {
    const todo = todos.find((item) => item.id === id)
    if (!todo) return

    try {
      const updated = await patchTodoRequest(id, {done: !todo.done})
      setTodos((current) => current.map((item) => item.id === id ? updated : item))
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not update the checkbox. Please try again.')
    }
  }

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done
    if (filter === 'done') return todo.done
    return true
  })

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <TodoCreate onCreate={createTodo} disabled={isLoading} />

      <div className="flex gap-2 mb-4" aria-label="Filter todos">
        <button
          type="button"
          onClick={() => setFilter('all')}
          aria-pressed={filter === 'all'}
          className={`rounded px-4 py-2 ${filter === 'all' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setFilter('active')}
          aria-pressed={filter === 'active'}
          className={`rounded px-4 py-2 ${filter === 'active' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => setFilter('done')}
          aria-pressed={filter === 'done'}
          className={`rounded px-4 py-2 ${filter === 'done' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Done
        </button>
      </div>

      {isLoading && <p className="text-gray-500">Loading your todos...</p>}
      {error && <p role="alert" className="rounded bg-red-50 p-3 text-red-700">{error}</p>}

      {!isLoading && todos.length === 0 && !error && (
        <p className="text-gray-500">Nothing yet. Add something above.</p>
      )}
      {!isLoading && todos.length > 0 && visibleTodos.length === 0 && (
        <p className="text-gray-500">No {filter} todos.</p>
      )}
      {!isLoading && visibleTodos.length > 0 && (
        <TodoList
          todos={visibleTodos}
          onDelete={deleteTodoById}
          onEdit={editTodoById}
          onToggle={toggleTodoById}
        />
      )}

      {!isLoading && (
        <p className="mt-6 text-sm text-gray-500">
          {visibleTodos.length} of {todos.length} {todos.length === 1 ? 'thing' : 'things'} shown
        </p>
      )}
    </div>
  )
}

export default App
