import {useState} from 'react'

const BookEdit = ({book, onSubmit, onCancel}) => {
  const [title, setTitle] = useState(book.title)
  const [priority, setPriority] = useState(book.priority ?? 'later')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!title.trim() || isSaving) return

    setIsSaving(true)
    try {
      await onSubmit(book.id, title.trim(), priority)
    } catch {
      // Leave the edit open after a failed request.
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="book-form edit-form">
      <label className="field book-title-field">
        <span>Book title</span>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={isSaving}
          required
        />
      </label>
      <label className="field priority-field">
        <span>When?</span>
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          disabled={isSaving}
        >
          <option value="next">Next</option>
          <option value="later">Later</option>
          <option value="someday">Someday</option>
        </select>
      </label>
      <div className="form-actions">
        <button className="primary-button" disabled={isSaving || !title.trim()}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        <button type="button" className="text-button" onClick={onCancel} disabled={isSaving}>Cancel</button>
      </div>
    </form>
  )
}

export default BookEdit
