import {useState} from 'react'
import BookForm from './components/BookForm'
import BookList from './components/BookList'

const App = () => {
  const [books, setBooks] = useState([])

  // `await`-able on purpose. In your midterm this is
  // `await axios.post(...)` -- the delay here stands in for the network so we
  // can see what the form does while it waits.
  const addBook = async (book) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    setBooks([...books, {...book, id: Date.now()}])
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
