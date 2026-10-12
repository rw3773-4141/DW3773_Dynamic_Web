import {useState} from 'react'

const TodoCreate = (props) => {
  const {onCreate} = props
  const [title, setTitle] = useState('')

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate(title)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="What needs doing?"
        className="flex-1 border border-gray-300 rounded px-3 py-2"
      />
      <button className="bg-blue-900 text-white px-5 py-2 rounded">Add</button>
    </form>
  )
}

export default TodoCreate
