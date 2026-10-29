import {useState} from 'react'
import useTodosContext from '../hooks/use-todos-context'

const TodoCreate = () => {
  const {createTodo, isLoading} = useTodosContext()
  // the input's text lives here -- this component owns it, because nobody
  // else needs to know what you are halfway through typing
  const [title, setTitle] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!title.trim() || isSaving) return
    setIsSaving(true)
    try {
      await createTodo(title.trim())
      setTitle('')
    } catch {
      // The Provider shows an error; keep the input for another attempt.
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="What needs doing?"
        aria-label="New todo"
        disabled={isLoading || isSaving}
        className="flex-1 border border-gray-300 rounded px-3 py-2"
      />
      <button disabled={isLoading || isSaving || !title.trim()} className="bg-blue-900 text-white px-5 py-2 rounded disabled:opacity-50">Add</button>
    </form>
  )
}

export default TodoCreate
