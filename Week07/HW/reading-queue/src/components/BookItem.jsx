import {useState} from 'react'
import BookEdit from './BookEdit'
import useBooksContext from '../hooks/use-books-context'

const priorityLabels = {next: 'Read next', later: 'Read later', someday: 'Someday'}

const BookItem = ({book}) => {
  const [showEdit, setShowEdit] = useState(false)
  const {deleteBookById, editBookById, toggleBookById} = useBooksContext()

  const handleSubmit = async (id, title, priority) => {
    await editBookById(id, title, priority)
    setShowEdit(false)
  }

  return (
    <li className="book-row">
      {showEdit ? (
        <BookEdit book={book} onSubmit={handleSubmit} onCancel={() => setShowEdit(false)} />
      ) : (
        <article className="book-content">
          <div className="book-details">
            <span className={`priority-badge priority-${book.priority ?? 'later'}`}>
              {priorityLabels[book.priority] ?? 'Read later'}
            </span>
            <h3 className={book.done ? 'finished-title' : ''}>{book.title}</h3>
            <label className="finish-label">
              <input
                type="checkbox"
                checked={Boolean(book.done)}
                onChange={() => toggleBookById(book.id, !book.done)}
              />
              <span>{book.done ? 'Finished' : 'Mark as finished'}</span>
            </label>
          </div>
          <div className="row-actions">
            <button type="button" className="text-button" onClick={() => setShowEdit(true)}>Edit</button>
            <button type="button" className="text-button delete-button" onClick={() => deleteBookById(book.id)}>Delete</button>
          </div>
        </article>
      )}
    </li>
  )
}

export default BookItem
