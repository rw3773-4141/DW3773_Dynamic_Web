import TodoItem from './TodoItem'
import useTodosContext from '../hooks/use-todos-context'
import useFilterContext from '../hooks/use-filter-context'

const TodoList = () => {
  const {todos} = useTodosContext()
  const {filter} = useFilterContext()

  // Filtering uses the todos already in state; it makes no server request.
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done
    if (filter === 'done') return todo.done
    return true
  })

  if (visibleTodos.length === 0) {
    return <p className="text-gray-500">No {filter} todos.</p>
  }

  return <div>{visibleTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}</div>
}

export default TodoList
