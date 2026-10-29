import BookItem from './BookItem'
import useBooksContext from '../hooks/use-books-context'

const BookList = ({filter}) => {
  const {books} = useBooksContext()
  const visibleBooks = books.filter((book) => {
    return filter === 'all' || (book.priority ?? 'later') === filter
  })

  if (visibleBooks.length === 0) {
    return <p className="state-message">No books in this group yet.</p>
  }

  return <ul className="book-list">{visibleBooks.map((book) => <BookItem key={book.id} book={book} />)}</ul>
}

export default BookList
