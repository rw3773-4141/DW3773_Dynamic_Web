import {useState} from 'react'
import RestaurantEdit from './RestaurantEdit'

const RestaurantItem = ({restaurant, onDelete, onEdit, onToggle}) => {
  const [showEdit, setShowEdit] = useState(false)

  const handleSubmit = async (id, name, area) => {
    await onEdit(id, name, area)
    setShowEdit(false)
  }

  return (
    <li className="restaurant-row">
      {showEdit ? (
        <RestaurantEdit
          restaurant={restaurant}
          onSubmit={handleSubmit}
          onCancel={() => setShowEdit(false)}
        />
      ) : (
        <article className="restaurant-card">
          <div className="restaurant-info">
            <span className="area-badge">{restaurant.area || 'Area not set'}</span>
            <h3>{restaurant.name}</h3>
            <label className="visit-label">
              <input
                type="checkbox"
                checked={Boolean(restaurant.visited)}
                onChange={() => onToggle(restaurant.id)}
              />
              <span>{restaurant.visited ? 'Visited' : 'Mark as visited'}</span>
            </label>
          </div>
          <div className="row-actions">
            <button type="button" className="text-button" onClick={() => setShowEdit(true)}>
              Edit
            </button>
            <button type="button" className="text-button delete-button" onClick={() => onDelete(restaurant.id)}>
              Delete
            </button>
          </div>
        </article>
      )}
    </li>
  )
}

export default RestaurantItem
