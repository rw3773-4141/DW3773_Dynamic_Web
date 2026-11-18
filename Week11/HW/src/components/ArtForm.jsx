import {useSelector, useDispatch} from 'react-redux'
import {changeName, changePrice, addArt} from '../store'

const ArtForm = () => {
  const dispatch = useDispatch()

  // Both inputs are controlled, and the store is what controls them.
  // There is no useState anywhere in this component.
  const name = useSelector((state) => state.form.name)
  const price = useSelector((state) => state.form.price)

  const handleNameChange = (event) => {
    dispatch(changeName(event.target.value))
  }

  const handlePriceChange = (event) => {
    // every input hands back a string, even type="number"
    const value = parseInt(event.target.value) || 0
    dispatch(changePrice(value))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!name.trim() || price < 0) {
      return
    }

    // The component is the bridge between the two slices: it reads from
    // form and sends the values to art in the payload.
    dispatch(addArt({name: name.trim(), price}))
  }

  return (
    <section className="border-b-4 border-ink p-5">
      <h2 className="mb-3 text-xs font-black uppercase tracking-widest">
        Add a piece
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1 basis-48">
          <label className="block text-xs font-black uppercase" htmlFor="name">
            Artist and title
          </label>
          <input
            id="name"
            required
            maxLength="120"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Mondrian, Composition II"
            className="mt-1 w-full border-4 border-ink bg-white px-3 py-2"
          />
        </div>

        <div className="w-32">
          <label className="block text-xs font-black uppercase" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            min="0"
            value={price || ''}
            onChange={handlePriceChange}
            className="mt-1 w-full border-4 border-ink bg-white px-3 py-2"
          />
        </div>

        <button className="border-4 border-ink bg-flat-yellow px-4 py-2 text-xs font-black uppercase tracking-widest">
          Add
        </button>
      </form>
    </section>
  )
}

export default ArtForm
