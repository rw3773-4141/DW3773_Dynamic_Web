import {useState} from 'react'
import BookForm from './components/BookForm'
import BookList from './components/BookList'

const App = () => {
  const [books, setBooks] = useState([])

  const addBook = async (book) => {
    // This delay stands in for a request to a server.
    await new Promise((resolve) => setTimeout(resolve, 800))
    setBooks((current) => [...current, {...book, id: Date.now()}])
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Reading List</h1>
      <BookForm onAdd={addBook} />
      <BookList books={books} />
    </div>
  )
}

export default App
