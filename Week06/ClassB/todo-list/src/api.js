import axios from 'axios'

const BASE = 'http://localhost:3001'

export const fetchTodos = async () => {
  const response = await axios.get(`${BASE}/todos`)
  return response.data
}

export const createTodo = async (title) => {
  const response = await axios.post(`${BASE}/todos`, {title, done: false})
  return response.data
}

export const deleteTodo = async (id) => {
  await axios.delete(`${BASE}/todos/${id}`)
}

export const updateTodo = async (todo) => {
  // PUT replaces the full record, so send every existing field.
  const response = await axios.put(`${BASE}/todos/${todo.id}`, todo)
  return response.data
}

export const patchTodo = async (id, changes) => {
  // PATCH changes only the fields named in changes.
  const response = await axios.patch(`${BASE}/todos/${id}`, changes)
  return response.data
}
