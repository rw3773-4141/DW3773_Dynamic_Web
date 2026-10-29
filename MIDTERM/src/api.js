import axios from 'axios'

const BASE = 'http://localhost:3001/restaurants'

export const fetchRestaurants = async () => {
  const response = await axios.get(BASE)
  return response.data
}

export const createRestaurant = async (name, area) => {
  const response = await axios.post(BASE, {name, area, visited: false})
  return response.data
}

export const deleteRestaurant = async (id) => {
  await axios.delete(BASE + '/' + id)
}

export const updateRestaurant = async (restaurant) => {
  // PUT replaces the whole record, including its area and visited state.
  const response = await axios.put(BASE + '/' + restaurant.id, restaurant)
  return response.data
}

export const patchRestaurant = async (id, changes) => {
  const response = await axios.patch(BASE + '/' + id, changes)
  return response.data
}
