/* The favourites-only setting belongs in uiSlice because it describes the current
   view. favouritesSlice keeps saved ids even when a filter hides their cards.
   I combine colour and favourites with AND, so blue plus favourites shows only
   saved blue prints. I expect both selected controls to apply together, so
   neither control resets the other.
   I combine them in Catalog because there are only six static prints, so a
   filter here is easy to follow. useSelector reads the existing ids array and
   primitive filter values; it does not return a new filtered array each time. */
import {useSelector, useDispatch} from 'react-redux'
import {PRINTS} from '../data/prints.js'
import {itemAdded} from '../features/cartSlice.js'
import {favouriteToggled, favouritesCleared, selectFavouriteIds} from '../features/favouritesSlice.js'
import {
  filterChanged,
  favouritesOnlyChanged,
  selectColourFilter,
  selectFavouritesOnly,
} from '../features/uiSlice.js'

const SWATCH = {
  red: 'bg-flat-red',
  blue: 'bg-flat-blue',
  yellow: 'bg-flat-yellow',
}
const FILTERS = ['all', 'red', 'blue', 'yellow']

const Catalog = () => {
  const dispatch = useDispatch()
  const colourFilter = useSelector(selectColourFilter)
  const favouritesOnly = useSelector(selectFavouritesOnly)
  const favouriteIds = useSelector(selectFavouriteIds)

  // This list is derived from existing data, so it does not need its own state.
  const visible = PRINTS.filter((print) => {
    const matchesColour = colourFilter === 'all' || print.color === colourFilter
    const matchesFavourites = !favouritesOnly || favouriteIds.includes(print.id)
    return matchesColour && matchesFavourites
  })

  return (
    <section aria-label="Print catalog" className="min-w-0">
      <div className="flex border-b-4 border-ink" role="group" aria-label="Filter by colour">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => dispatch(filterChanged(filter))}
            aria-pressed={filter === colourFilter}
            className={`flex-1 border-r-4 border-ink px-2 py-3 text-xs font-black uppercase ${
              filter === colourFilter ? 'bg-ink text-paper' : 'bg-paper'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-ink px-4 py-3">
        <label className="flex items-center gap-3 text-xs font-black uppercase">
          <input
            type="checkbox"
            checked={favouritesOnly}
            onChange={(event) => dispatch(favouritesOnlyChanged(event.target.checked))}
            className="h-5 w-5 accent-ink"
          />
          Show only favourites
        </label>
        <button
          type="button"
          onClick={() => dispatch(favouritesCleared())}
          disabled={favouriteIds.length === 0}
          className="border-4 border-ink px-2 py-1 text-xs font-black uppercase disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear favourites
        </button>
      </div>
      {visible.length === 0 ? (
        <p className="px-4 py-8 text-sm" role="status">
          No prints match these filters. Try another colour or turn off favourites only.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2">
          {visible.map((print) => {
            const isFavourite = favouriteIds.includes(print.id)
            return (
              <li key={print.id} className="min-w-0 border-b-4 border-r-4 border-ink">
                <div className={`h-28 ${SWATCH[print.color]}`} />
                <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-3">
                  <div>
                    <h2 className="text-sm font-black uppercase">{print.title}</h2>
                    <p className="text-xs">${print.price}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => dispatch(itemAdded(print))}
                      aria-label={`Add ${print.title} to cart`}
                      className="border-4 border-ink bg-flat-yellow px-3 py-2 text-xs font-black uppercase"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => dispatch(favouriteToggled(print.id))}
                      aria-pressed={isFavourite}
                      aria-label={`${isFavourite ? 'Remove' : 'Add'} ${print.title} ${isFavourite ? 'from' : 'to'} favourites`}
                      className={`border-4 border-ink px-3 py-2 text-xs font-black uppercase ${
                        isFavourite ? 'bg-ink text-flat-yellow' : 'bg-paper text-ink'
                      }`}
                    >
                      <span aria-hidden="true">{isFavourite ? '★ FAV' : '☆ FAV'}</span>
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default Catalog
