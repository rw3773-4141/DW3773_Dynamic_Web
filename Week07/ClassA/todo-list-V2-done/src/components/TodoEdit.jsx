import {useState} from 'react'

const TodoEdit = (props) => {
  const {todo, onSubmit} = props
  // start the input at the todo's CURRENT title, so editing means changing
  // what is there rather than retyping it
  const [title, setTitle] = useState(todo.title)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!title.trim() || isSaving) return
    setIsSaving(true)
    try {
      await onSubmit(todo.id, title.trim())
    } catch {
      // The Provider shows an error; leave the edit open for another attempt.
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 py-3">
      <input
        type="text"
        value={title}
        onChange={handleChange}
        aria-label="Edit todo"
        disabled={isSaving}
        className="flex-1 border border-gray-300 rounded px-3 py-2"
      />
      <button disabled={isSaving || !title.trim()} className="bg-blue-900 text-white px-4 py-2 rounded text-sm disabled:opacity-50">
        Save
      </button>
    </form>
  )
}

export default TodoEdit
