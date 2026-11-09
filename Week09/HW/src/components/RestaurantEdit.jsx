import {useState} from 'react'
import {AREAS} from '../areas'

const RestaurantEdit = ({restaurant, onSubmit, onCancel}) => {
  const [name, setName] = useState(restaurant.name)
  const [area, setArea] = useState(restaurant.area || '')
  const [isSaving, setIsSaving] = useState(false)
  const [touched, setTouched] = useState({})
  const [saveError, setSaveError] = useState('')

  const nameError = !name.trim() ? 'Enter a restaurant name.' : ''
  const areaError = !area ? 'Choose an area.' : ''

  const handleSubmit = async (event) => {
    event.preventDefault()
    setTouched({name: true, area: true})
    if (nameError || areaError || isSaving) return

    setIsSaving(true)
    setSaveError('')
    try {
      await onSubmit(restaurant.id, name.trim(), area)
    } catch {
      setSaveError('Could not save your changes. Your entries are still here; check that npm run server is running, then try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form className="restaurant-form edit-form" onSubmit={handleSubmit} noValidate>
      <div className="field name-field">
        <label htmlFor="edit-name">Restaurant name</label>
        <input
          id="edit-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => setTouched((current) => ({...current, name: true}))}
          maxLength="100"
          required
          aria-invalid={touched.name && nameError ? true : undefined}
          aria-describedby={touched.name && nameError ? 'edit-name-error' : undefined}
          disabled={isSaving}
        />
        {touched.name && nameError && <span id="edit-name-error" className="field-error">{nameError}</span>}
      </div>
      <div className="field area-field">
        <label htmlFor="edit-area">Area</label>
        <select
          id="edit-area"
          value={area}
          onChange={(event) => setArea(event.target.value)}
          onBlur={() => setTouched((current) => ({...current, area: true}))}
          required
          aria-invalid={touched.area && areaError ? true : undefined}
          aria-describedby={touched.area && areaError ? 'edit-area-error' : undefined}
          disabled={isSaving}
        >
          <option value="">Choose an area</option>
          {AREAS.map((area) => <option key={area} value={area}>{area}</option>)}
        </select>
        {touched.area && areaError && <span id="edit-area-error" className="field-error">{areaError}</span>}
      </div>
      <div className="edit-actions">
        <button className="primary-button" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        <button type="button" className="text-button" onClick={onCancel} disabled={isSaving}>Cancel</button>
      </div>
      {saveError && <p role="alert" className="save-error">{saveError}</p>}
    </form>
  )
}

export default RestaurantEdit
