import {useState} from 'react'

const SearchBar = (props) => {
  const {onSubmit} = props
  const [term, setTerm] = useState('')

  const handleChange = (event) => {
    setTerm(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    onSubmit(term)
  }

  return (
    <div className="p-4">
      <form onSubmit={handleFormSubmit}>
        <label className="block mb-2 font-medium" htmlFor="image-search">
          Search Unsplash photos
        </label>
        <input
          id="image-search"
          value={term}
          onChange={handleChange}
          placeholder="Search for photos..."
          className="border border-gray-300 rounded px-3 py-2 w-80"
        />
      </form>
    </div>
  )
}

export default SearchBar
