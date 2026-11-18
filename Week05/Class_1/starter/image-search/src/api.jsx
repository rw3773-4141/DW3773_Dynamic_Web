import axios from 'axios'

const searchImages = () => {
  const response = axios.get('https://api.unsplash.com/search/photos', {
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
    },
    params: {query: 'butterflies'},
  })

  console.log(response)
  return response.data.results
}

export default searchImages