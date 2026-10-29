import {createContext, useCallback, useState} from 'react'
import {
  fetchTodos as fetchTodosRequest,
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  updateTodo as updateTodoRequest,
  toggleTodo as toggleTodoRequest,
} from '../api'

const TodosContext = createContext(null)

const Provider = ({children}) => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // App uses this in an effect, so its identity must stay stable across renders.
  const fetchTodos = useCallback(async () => {
    try {
      const savedTodos = await fetchTodosRequest()
      setTodos(savedTodos)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not reach the server. Is npm run server running?')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createTodo = async (title) => {
    try {
      const newTodo = await createTodoRequest(title)
      setTodos((current) => [...current, newTodo])
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not add the todo. Please try again.')
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
      // PUT replaces the record, so preserve its other fields, including done.
      const updated = await updateTodoRequest({...todo, title: newTitle})
      setTodos((current) => current.map((item) => item.id === id ? updated : item))
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not save the edit. Please try again.')
      throw err
    }
  }

  const toggleTodoById = async (id, done) => {
    try {
      const updated = await toggleTodoRequest(id, done)
      setTodos((current) => current.map((item) => item.id === id ? updated : item))
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not update the checkbox. Please try again.')
    }
  }

  return (
    <TodosContext.Provider value={{todos, isLoading, error, fetchTodos, createTodo, deleteTodoById, editTodoById, toggleTodoById}}>
      {children}
    </TodosContext.Provider>
  )
}

export {Provider}
export default TodosContext
