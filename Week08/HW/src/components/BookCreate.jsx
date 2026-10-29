import {useState} from 'react'
import useBooksContext from '../hooks/use-books-context'

const EMPTY = {title: '', priority: 'next'}

const BookCreate = () => {
  const {createBook, isLoading} = useBooksContext()
  const [values, setValues] = useState(EMPTY)
  const [touched, setTouched] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const titleError = !values.title.trim() ? 'Add a book title before saving.' : null
  const showTitleError = touched.title && titleError

  const handleChange = (event) => {
    const {name, value} = event.target
    setValues((current) => ({...current, [name]: value}))
    setSubmitError(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setTouched({title: true})
    if (titleError || isLoading || isSaving) return

    setIsSaving(true)
    setSubmitError(null)
    try {
      await createBook(values.title.trim(), values.priority)
      setValues(EMPTY)
      setTouched({})
    } catch {
      setSubmitError('Could not save this book. Your entries are still here. Check that the server is running, then try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="book-form create-form">
      <div className="field book-title-field">
        <label htmlFor="create-title">Book title</label>
        <input
          id="create-title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          onBlur={() => setTouched((current) => ({...current, title: true}))}
          placeholder="What would you like to read?"
          maxLength="120"
          disabled={isLoading || isSaving}
          aria-invalid={showTitleError ? true : undefined}
          aria-describedby={showTitleError ? 'create-title-error' : undefined}
        />
        {showTitleError && <p id="create-title-error" className="field-error" role="alert">{titleError}</p>}
      </div>
      <div className="field priority-field">
        <label htmlFor="create-priority">When?</label>
        <select
          id="create-priority"
          name="priority"
          value={values.priority}
          onChange={handleChange}
          disabled={isLoading || isSaving}
        >
          <option value="next">Next</option>
          <option value="later">Later</option>
          <option value="someday">Someday</option>
        </select>
      </div>
      <button className="primary-button" disabled={isLoading || isSaving}>
        {isSaving ? 'Saving...' : 'Add book'}
      </button>
      {submitError && <p className="form-submit-error" role="alert">{submitError}</p>}
    </form>
  )
}

export default BookCreate
