import {useEffect} from 'react'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import FilterButtons from './components/FilterButtons'
import useTodosContext from './hooks/use-todos-context'

const App = () => {
  const {todos, isLoading, error, fetchTodos} = useTodosContext()

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const remaining = todos.filter((todo) => !todo.done).length

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <TodoCreate />
      <FilterButtons />

      {isLoading && <p className="text-gray-500">Loading your todos...</p>}
      {error && <p role="alert" className="rounded bg-red-50 p-3 text-red-700">{error}</p>}

      {!isLoading && !error && todos.length === 0 && (
        <p className="text-gray-500">Nothing yet. Add something above.</p>
      )}
      {!isLoading && todos.length > 0 && <TodoList />}

      {!isLoading && (
        <p className="mt-6 text-sm text-gray-500">
          {remaining} {remaining === 1 ? 'thing' : 'things'} left to do
        </p>
      )}
    </div>
  )
}

export default App
