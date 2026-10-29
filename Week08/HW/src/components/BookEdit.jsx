import {useState} from 'react'

const BookEdit = ({book, onSubmit, onCancel}) => {
  const [values, setValues] = useState({
    title: book.title,
    priority: book.priority ?? 'later',
  })
  const [touched, setTouched] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const titleError = !values.title.trim() ? 'Add a book title before saving.' : null
  const showTitleError = touched.title && titleError
  const titleId = `edit-title-${book.id}`
  const priorityId = `edit-priority-${book.id}`
  const titleErrorId = `edit-title-error-${book.id}`

  const handleChange = (event) => {
    const {name, value} = event.target
    setValues((current) => ({...current, [name]: value}))
    setSubmitError(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setTouched({title: true})
    if (titleError || isSaving) return

    setIsSaving(true)
    setSubmitError(null)
    try {
      await onSubmit(book.id, values.title.trim(), values.priority)
    } catch {
      setSubmitError('Could not save your changes. Your entries are still here. Check that the server is running, then try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="book-form edit-form">
      <div className="field book-title-field">
        <label htmlFor={titleId}>Book title</label>
        <input
          id={titleId}
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          onBlur={() => setTouched((current) => ({...current, title: true}))}
          maxLength="120"
          disabled={isSaving}
          aria-invalid={showTitleError ? true : undefined}
          aria-describedby={showTitleError ? titleErrorId : undefined}
        />
        {showTitleError && <p id={titleErrorId} className="field-error" role="alert">{titleError}</p>}
      </div>
      <div className="field priority-field">
        <label htmlFor={priorityId}>When?</label>
        <select
          id={priorityId}
          name="priority"
          value={values.priority}
          onChange={handleChange}
          disabled={isSaving}
        >
          <option value="next">Next</option>
          <option value="later">Later</option>
          <option value="someday">Someday</option>
        </select>
      </div>
      <div className="form-actions">
        <button className="primary-button" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        <button type="button" className="text-button" onClick={onCancel} disabled={isSaving}>Cancel</button>
      </div>
      {submitError && <p className="form-submit-error" role="alert">{submitError}</p>}
    </form>
  )
}

export default BookEdit
