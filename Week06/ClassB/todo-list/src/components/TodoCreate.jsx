import {useState} from 'react'

const TodoCreate = (props) => {
  const {onCreate, disabled} = props
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
      await onCreate(title.trim())
      setTitle('')
    } catch {
      // App shows the request error; keep the title so it can be retried.
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
        disabled={disabled || isSaving}
        className="flex-1 border border-gray-300 rounded px-3 py-2"
      />
      <button disabled={disabled || isSaving || !title.trim()} className="bg-blue-900 text-white px-5 py-2 rounded disabled:opacity-50">Add</button>
    </form>
  )
}

export default TodoCreate
