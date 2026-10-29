import {createContext, useCallback, useState} from 'react'
import {
  fetchBooks as fetchBooksRequest,
  createBook as createBookRequest,
  deleteBook as deleteBookRequest,
  updateBook as updateBookRequest,
  toggleBook as toggleBookRequest,
} from '../api'

const BooksContext = createContext(null)

const BooksProvider = ({children}) => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)

  const fetchBooks = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const savedBooks = await fetchBooksRequest()
      setBooks(savedBooks)
      setActionError(null)
    } catch (err) {
      console.error(err)
      setError('Could not load your books. Is npm run server running?')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createBook = async (title, priority) => {
    try {
      const newBook = await createBookRequest(title, priority)
      setBooks((current) => [...current, newBook])
      setActionError(null)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const deleteBookById = async (id) => {
    try {
      await deleteBookRequest(id)
      setBooks((current) => current.filter((book) => book.id !== id))
      setActionError(null)
    } catch (err) {
      console.error(err)
      setActionError('Could not delete the book. Check that the server is running, then try again.')
    }
  }

  const editBookById = async (id, title, priority) => {
    const book = books.find((item) => item.id === id)
    if (!book) return

    try {
      const updated = await updateBookRequest({...book, title, priority})
      setBooks((current) => current.map((item) => item.id === id ? updated : item))
      setActionError(null)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const toggleBookById = async (id, done) => {
    try {
      const updated = await toggleBookRequest(id, done)
      setBooks((current) => current.map((item) => item.id === id ? updated : item))
      setActionError(null)
    } catch (err) {
      console.error(err)
      setActionError('Could not update the book. Check that the server is running, then try again.')
    }
  }

  return (
    <BooksContext.Provider value={{books, isLoading, error, actionError, fetchBooks, createBook, deleteBookById, editBookById, toggleBookById}}>
      {children}
    </BooksContext.Provider>
  )
}

export {BooksProvider}
export default BooksContext
