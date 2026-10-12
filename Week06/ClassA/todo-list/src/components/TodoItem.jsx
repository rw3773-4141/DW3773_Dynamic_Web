import {useState} from 'react'
import TodoEdit from './TodoEdit'

const TodoItem = (props) => {
  const {todo, onDelete, onEdit, onToggle} = props
  const [showEdit, setShowEdit] = useState(false)

  const handleDelete = () => {
    onDelete(todo.id)
  }

  const handleEditClick = () => {
    setShowEdit(!showEdit)
  }

  const handleSubmit = (id, newTitle) => {
    onEdit(id, newTitle)
    setShowEdit(false)
  }

  const handleToggle = () => {
    onToggle(todo.id)
  }

  if (showEdit) {
    return <TodoEdit todo={todo} onSubmit={handleSubmit} />
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-3">
      <label className="flex items-center gap-3 min-w-0">
        <input type="checkbox" checked={todo.done} onChange={handleToggle} />
        <span className={todo.done ? 'line-through text-gray-400' : ''}>{todo.title}</span>
      </label>
      <div className="flex gap-3 text-sm shrink-0">
        <button onClick={handleEditClick} className="text-blue-700">
          edit
        </button>
        <button onClick={handleDelete} className="text-red-600">
          delete
        </button>
      </div>
    </div>
  )
}

export default TodoItem
