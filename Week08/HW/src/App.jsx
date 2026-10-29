import {useEffect, useState} from 'react'
import BookCreate from './components/BookCreate'
import BookList from './components/BookList'
import PriorityFilter from './components/PriorityFilter'
import useBooksContext from './hooks/use-books-context'

const App = () => {
  const {books, isLoading, error, actionError, fetchBooks} = useBooksContext()
  const [priorityFilter, setPriorityFilter] = useState('all')

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  const unfinished = books.filter((book) => !book.done).length
  const countUnavailable = Boolean(isLoading || error) && books.length === 0

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">A shelf for what comes next</p>
          <h1>Reading Queue</h1>
          <p className="intro">Keep the books you want to read in one place. Pick what is next, save the rest for later, and mark each one finished.</p>
        </div>
        <div className="count-card" aria-label={countUnavailable ? 'Book count unavailable' : `${unfinished} ${unfinished === 1 ? 'book' : 'books'} left to read`}>
          <strong>{countUnavailable ? '—' : unfinished}</strong>
          <span>{countUnavailable ? 'count unavailable' : unfinished === 1 ? 'book to read' : 'books to read'}</span>
        </div>
      </header>

      <section className="panel" aria-labelledby="add-heading">
        <h2 id="add-heading">Add a book</h2>
        <BookCreate />
      </section>

      <section className="panel" aria-labelledby="queue-heading">
        <div className="list-heading">
          <div>
            <p className="eyebrow">Your shelf</p>
            <h2 id="queue-heading">Books to choose from</h2>
          </div>
          <span className="total-count">{countUnavailable ? '—' : books.length} total</span>
        </div>

        <PriorityFilter filter={priorityFilter} onChange={setPriorityFilter} />

        {isLoading && <p role="status" className="state-message">Loading your books...</p>}
        {error && (
          <div role="alert" className="state-message error-message">
            <p>{error}</p>
            <button type="button" onClick={fetchBooks} disabled={isLoading}>Try again</button>
          </div>
        )}
        {actionError && <p role="alert" className="state-message error-message">{actionError}</p>}
        {!isLoading && !error && books.length === 0 && (
          <div className="state-message empty-message">
            <strong>Your shelf is waiting.</strong>
            <p>Add a book above, then choose whether it is next, later, or someday.</p>
          </div>
        )}
        {!isLoading && books.length > 0 && <BookList filter={priorityFilter} />}
      </section>
    </main>
  )
}

export default App
