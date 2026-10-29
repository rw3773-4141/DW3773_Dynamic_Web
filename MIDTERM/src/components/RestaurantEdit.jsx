import {useState} from 'react'
import {AREAS} from '../areas'

const RestaurantEdit = ({restaurant, onSubmit, onCancel}) => {
  const [name, setName] = useState(restaurant.name)
  const [area, setArea] = useState(restaurant.area || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name.trim() || !area || isSaving) return

    setIsSaving(true)
    try {
      await onSubmit(restaurant.id, name.trim(), area)
    } catch {
      // App shows the request error. Leave the edit form open for retry.
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form className="restaurant-form edit-form" onSubmit={handleSubmit}>
      <label className="field name-field">
        <span>Restaurant name</span>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength="100"
          required
          disabled={isSaving}
        />
      </label>
      <label className="field area-field">
        <span>Area</span>
        <select
          value={area}
          onChange={(event) => setArea(event.target.value)}
          required
          disabled={isSaving}
        >
          <option value="">Choose an area</option>
          {AREAS.map((area) => <option key={area} value={area}>{area}</option>)}
        </select>
      </label>
      <div className="edit-actions">
        <button className="primary-button" disabled={isSaving || !name.trim() || !area}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        <button type="button" className="text-button" onClick={onCancel} disabled={isSaving}>Cancel</button>
      </div>
    </form>
  )
}

export default RestaurantEdit
