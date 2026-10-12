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

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <TodoCreate onCreate={createTodo} disabled={isLoading} />

      {isLoading && <p className="text-gray-500">Loading your todos...</p>}
      {error && <p role="alert" className="rounded bg-red-50 p-3 text-red-700">{error}</p>}

      {!isLoading && todos.length === 0 && !error && (
        <p className="text-gray-500">Nothing yet. Add something above.</p>
      )}
      {!isLoading && todos.length > 0 && (
        <TodoList
          todos={todos}
          onDelete={deleteTodoById}
          onEdit={editTodoById}
          onToggle={toggleTodoById}
        />
      )}

      {!isLoading && (
        <p className="mt-6 text-sm text-gray-500">
          {todos.length} {todos.length === 1 ? 'thing' : 'things'} to do
        </p>
      )}
    </div>
  )
}

export default App
