import {useState} from 'react'
import {AREAS} from '../areas'

const RestaurantCreate = ({onCreate, disabled}) => {
  const [name, setName] = useState('')
  const [area, setArea] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name.trim() || !area || isSaving) return

    setIsSaving(true)
    try {
      await onCreate(name.trim(), area)
      setName('')
      setArea('')
    } catch {
      // App shows the request error. Keep both fields so the user can retry.
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form className="restaurant-form" onSubmit={handleSubmit}>
      <label className="field name-field">
        <span>Restaurant name</span>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength="100"
          required
          disabled={disabled || isSaving}
        />
      </label>
      <label className="field area-field">
        <span>Area</span>
        <select
          value={area}
          onChange={(event) => setArea(event.target.value)}
          required
          disabled={disabled || isSaving}
        >
          <option value="">Choose an area</option>
          {AREAS.map((area) => <option key={area} value={area}>{area}</option>)}
        </select>
      </label>
      <button className="primary-button" disabled={disabled || isSaving || !name.trim() || !area}>
        {isSaving ? 'Adding...' : 'Add to list'}
      </button>
    </form>
  )
}

export default RestaurantCreate
