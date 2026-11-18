import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {changeSortOrder, clearCollection} from '../store'

const CollectionActions = () => {
  const dispatch = useDispatch()
  const sortOrder = useSelector((state) => state.art.sortOrder)
  const count = useSelector((state) => state.art.data.length)
  // Only this component needs to know whether its confirmation is open.
  const [isConfirming, setIsConfirming] = useState(false)

  const handleClear = () => {
    dispatch(clearCollection())
    setIsConfirming(false)
  }

  return (
    <section className="border-b-4 border-ink p-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <label className="text-xs font-black uppercase" htmlFor="sortOrder">
          Sort by
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(event) => dispatch(changeSortOrder(event.target.value))}
            className="mt-1 block max-w-full border-4 border-ink bg-white px-3 py-2 text-sm font-normal normal-case"
          >
            <option value="added">Order added</option>
            <option value="price-desc">Price: highest first</option>
          </select>
        </label>
        <button
          type="button"
          onClick={() => setIsConfirming(true)}
          disabled={count === 0}
          className="border-4 border-ink px-3 py-2 text-xs font-black uppercase"
        >
          Clear collection
        </button>
      </div>
      {isConfirming && count > 0 && (
        <div role="group" aria-labelledby="clear-question" className="mt-4 border-4 border-ink bg-flat-yellow p-3">
          <p id="clear-question" className="text-sm font-bold">
            Delete all {count} {count === 1 ? 'piece' : 'pieces'}? This includes pieces hidden by search.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="button" onClick={handleClear} className="border-4 border-ink bg-flat-red px-3 py-2 text-xs font-black uppercase text-paper">
              Yes, delete all
            </button>
            <button type="button" onClick={() => setIsConfirming(false)} className="border-4 border-ink bg-paper px-3 py-2 text-xs font-black uppercase">
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default CollectionActions
