/*
  This effect uses [] so the default API search runs once when the page mounts.
  Putting `images` in this dependency array would run another request after
  setImages changes the results, creating a request loop and wasting the API limit.
*/
import {useEffect, useRef, useState} from 'react'
import SearchBar from './components/SearchBar'
import ImageList from './components/ImageList'
import searchImages from './api'

const DEFAULT_SEARCH = 'New York City'

const App = () => {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const didLoadDefaultSearch = useRef(false)

  const handleSubmit = async (term) => {
    const cleanedTerm = term.trim()

    if (!cleanedTerm) {
      return
    }

    setIsLoading(true)
    setError(null)
    setSearched(true)
    setSearchTerm(cleanedTerm)

    try {
      const results = await searchImages(cleanedTerm)
      setImages(results)
    } catch (err) {
      console.error(err)
      setError('That search did not work. Check your Unsplash key and the console.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Strict Mode runs effects an extra time in development. This ref still
    // keeps the default request to one call for this mounted app.
    if (didLoadDefaultSearch.current) {
      return
    }

    didLoadDefaultSearch.current = true
    handleSubmit(DEFAULT_SEARCH)
  }, [])

  return (
    <div className="p-4">
      <SearchBar onSubmit={handleSubmit} />

      {searched && (
        <h2 className="px-4 pb-2 text-2xl font-semibold">Photos for “{searchTerm}”</h2>
      )}

      {isLoading && <p className="p-4 text-gray-500">Searching...</p>}
      {error && <p className="p-4 text-red-600">{error}</p>}
      {!isLoading && !error && searched && images.length === 0 && (
        <p className="p-4 text-gray-500">No photos for that one. Try another word.</p>
      )}

      <ImageList images={images} />
    </div>
  )
}

export default App
