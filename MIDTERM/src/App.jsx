import {useEffect, useState} from 'react'
import RestaurantCreate from './components/RestaurantCreate'
import RestaurantList from './components/RestaurantList'
import {AREAS} from './areas'
import {
  fetchRestaurants,
  createRestaurant as createRestaurantRequest,
  deleteRestaurant as deleteRestaurantRequest,
  updateRestaurant as updateRestaurantRequest,
  patchRestaurant as patchRestaurantRequest,
} from './api'

const App = () => {
  const [restaurants, setRestaurants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [areaFilter, setAreaFilter] = useState('all')

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const savedRestaurants = await fetchRestaurants()
        setRestaurants(savedRestaurants)
        setError(null)
      } catch (err) {
        console.error(err)
        setError('Could not load your restaurants. Is npm run server running?')
      } finally {
        setIsLoading(false)
      }
    }
    loadRestaurants()
  }, [])

  const createRestaurant = async (name, area) => {
    try {
      const created = await createRestaurantRequest(name, area)
      setRestaurants((current) => [...current, created])
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not add the restaurant. Check that npm run server is running.')
      throw err
    }
  }

  const deleteRestaurantById = async (id) => {
    try {
      await deleteRestaurantRequest(id)
      setRestaurants((current) => current.filter((restaurant) => restaurant.id !== id))
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not delete the restaurant. Please try again.')
    }
  }

  const editRestaurantById = async (id, name, area) => {
    const restaurant = restaurants.find((item) => item.id === id)
    if (!restaurant) return

    try {
      // PUT replaces the record, so the spread keeps its id and visited state.
      const updated = await updateRestaurantRequest({...restaurant, name, area})
      setRestaurants((current) => current.map((item) => item.id === id ? updated : item))
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not save your changes. Please try again.')
      throw err
    }
  }

  const toggleRestaurantById = async (id) => {
    const restaurant = restaurants.find((item) => item.id === id)
    if (!restaurant) return

    try {
      const updated = await patchRestaurantRequest(id, {visited: !restaurant.visited})
      setRestaurants((current) => current.map((item) => item.id === id ? updated : item))
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not update the visit status. Please try again.')
    }
  }

  const visibleRestaurants = restaurants.filter((restaurant) => {
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'visited' ? restaurant.visited : !restaurant.visited)
    const matchesArea = areaFilter === 'all' || restaurant.area === areaFilter
    return matchesStatus && matchesArea
  })

  const visitedCount = restaurants.filter((restaurant) => restaurant.visited).length
  const toTryCount = restaurants.length - visitedCount
  const countUnavailable = isLoading || Boolean(error && restaurants.length === 0)

  return (
    <main className="app-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Your NYC food passport</p>
          <h1>Places to Eat</h1>
          <p className="intro">Save the places you want to eat, find one by area, and check it off when you go.</p>
        </div>
        <div className="hero-stats" aria-label="Restaurant counts">
          <div><strong>{countUnavailable ? '—' : toTryCount}</strong><span>to try</span></div>
          <div><strong>{countUnavailable ? '—' : visitedCount}</strong><span>visited</span></div>
        </div>
      </header>

      <section className="panel add-panel" aria-labelledby="add-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Save a recommendation</p>
            <h2 id="add-heading">Add a place</h2>
          </div>
        </div>
        <RestaurantCreate onCreate={createRestaurant} disabled={isLoading} />
      </section>

      <section className="panel list-panel" aria-labelledby="list-heading">
        <div className="section-heading list-title-row">
          <div>
            <p className="eyebrow">The places you saved</p>
            <h2 id="list-heading">Your list</h2>
          </div>
          <span className="total-count">{restaurants.length} {restaurants.length === 1 ? 'place' : 'places'}</span>
        </div>

        <div className="filters">
          <div className="status-filters" role="group" aria-label="Filter by visit status">
            {[
              {value: 'all', label: 'All'},
              {value: 'to-try', label: 'To try'},
              {value: 'visited', label: 'Visited'},
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setStatusFilter(option.value)}
                aria-pressed={statusFilter === option.value}
                className={statusFilter === option.value ? 'selected-filter' : ''}
              >{option.label}</button>
            ))}
          </div>
          <label className="area-filter">
            <span>Area</span>
            <select value={areaFilter} onChange={(event) => setAreaFilter(event.target.value)}>
              <option value="all">All areas</option>
              {AREAS.map((area) => <option key={area} value={area}>{area}</option>)}
            </select>
          </label>
        </div>

        {isLoading && <p role="status" className="state-message">Loading your list...</p>}
        {error && <p role="alert" className="state-message error-message">{error}</p>}
        {!isLoading && restaurants.length === 0 && !error && (
          <div className="state-message empty-message">
            <strong>Your next favorite place starts here.</strong>
            <p>Add a restaurant above and choose its area to begin your list.</p>
          </div>
        )}
        {!isLoading && restaurants.length > 0 && visibleRestaurants.length === 0 && (
          <p className="state-message">No restaurants match these filters yet.</p>
        )}
        {!isLoading && visibleRestaurants.length > 0 && (
          <RestaurantList
            restaurants={visibleRestaurants}
            onDelete={deleteRestaurantById}
            onEdit={editRestaurantById}
            onToggle={toggleRestaurantById}
          />
        )}
      </section>
    </main>
  )
}

export default App
