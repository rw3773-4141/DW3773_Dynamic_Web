import axios from 'axios'

const KEY = import.meta.env.VITE_UNSPLASH_KEY

const searchImages = async (term) => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    headers: {
      Authorization: `Client-ID ${KEY}`,
    },
    params: {query: term},
  })

  return response.data.results
}

export default searchImages
