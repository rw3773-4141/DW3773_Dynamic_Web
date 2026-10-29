import {useState} from 'react'
import useBooksContext from '../hooks/use-books-context'

const BookCreate = () => {
  const {createBook, isLoading} = useBooksContext()
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('next')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!title.trim() || isSaving) return

    setIsSaving(true)
    try {
      await createBook(title.trim(), priority)
      setTitle('')
      setPriority('next')
    } catch {
      // Keep both controlled fields so the reader can retry.
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="book-form create-form">
      <label className="field book-title-field">
        <span>Book title</span>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What would you like to read?"
          disabled={isLoading || isSaving}
          required
        />
      </label>
      <label className="field priority-field">
        <span>When?</span>
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          disabled={isLoading || isSaving}
        >
          <option value="next">Next</option>
          <option value="later">Later</option>
          <option value="someday">Someday</option>
        </select>
      </label>
      <button className="primary-button" disabled={isLoading || isSaving || !title.trim()}>
        {isSaving ? 'Saving...' : 'Add book'}
      </button>
    </form>
  )
}

export default BookCreate
