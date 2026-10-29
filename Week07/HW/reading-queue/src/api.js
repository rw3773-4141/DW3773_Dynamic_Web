import axios from 'axios'

const BASE = 'http://localhost:3001/books'

export const fetchBooks = async () => {
  const response = await axios.get(BASE)
  return response.data
}

export const createBook = async (title, priority) => {
  const response = await axios.post(BASE, {title, priority, done: false})
  return response.data
}

export const deleteBook = async (id) => {
  await axios.delete(`${BASE}/${id}`)
}

export const updateBook = async (book) => {
  // PUT replaces the whole record, so send title, priority, done, and id.
  const response = await axios.put(`${BASE}/${book.id}`, book)
  return response.data
}

export const toggleBook = async (id, done) => {
  const response = await axios.patch(`${BASE}/${id}`, {done})
  return response.data
}
