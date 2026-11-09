import {useState} from 'react'
import {AREAS} from '../areas'

const RestaurantCreate = ({onCreate, disabled}) => {
  const [name, setName] = useState('')
  const [area, setArea] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [touched, setTouched] = useState({})
  const [saveError, setSaveError] = useState('')

  const nameError = !name.trim() ? 'Enter a restaurant name.' : ''
  const areaError = !area ? 'Choose an area.' : ''

  const handleSubmit = async (event) => {
    event.preventDefault()
    setTouched({name: true, area: true})
    if (nameError || areaError || isSaving || disabled) return

    setIsSaving(true)
    setSaveError('')
    try {
      await onCreate(name.trim(), area)
      setName('')
      setArea('')
      setTouched({})
    } catch {
      setSaveError('Could not save this place. Your entries are still here; check that npm run server is running, then try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form className="restaurant-form" onSubmit={handleSubmit} noValidate>
      <div className="field name-field">
        <label htmlFor="create-name">Restaurant name</label>
        <input
          id="create-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => setTouched((current) => ({...current, name: true}))}
          maxLength="100"
          required
          aria-invalid={touched.name && nameError ? true : undefined}
          aria-describedby={touched.name && nameError ? 'create-name-error' : undefined}
          disabled={disabled || isSaving}
        />
        {touched.name && nameError && <span id="create-name-error" className="field-error">{nameError}</span>}
      </div>
      <div className="field area-field">
        <label htmlFor="create-area">Area</label>
        <select
          id="create-area"
          value={area}
          onChange={(event) => setArea(event.target.value)}
          onBlur={() => setTouched((current) => ({...current, area: true}))}
          required
          aria-invalid={touched.area && areaError ? true : undefined}
          aria-describedby={touched.area && areaError ? 'create-area-error' : undefined}
          disabled={disabled || isSaving}
        >
          <option value="">Choose an area</option>
          {AREAS.map((area) => <option key={area} value={area}>{area}</option>)}
        </select>
        {touched.area && areaError && <span id="create-area-error" className="field-error">{areaError}</span>}
      </div>
      <button className="primary-button" disabled={disabled || isSaving}>
        {isSaving ? 'Adding...' : 'Add to list'}
      </button>
      {saveError && <p role="alert" className="save-error">{saveError}</p>}
    </form>
  )
}

export default RestaurantCreate
