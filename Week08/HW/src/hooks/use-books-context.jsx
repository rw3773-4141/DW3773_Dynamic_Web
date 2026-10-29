import {useContext} from 'react'
import BooksContext from '../context/books'

const useBooksContext = () => {
  const context = useContext(BooksContext)
  if (!context) throw new Error('useBooksContext must be used inside BooksProvider')
  return context
}

export default useBooksContext
