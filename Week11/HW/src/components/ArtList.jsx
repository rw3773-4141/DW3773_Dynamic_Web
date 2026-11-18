import {useSelector, useDispatch} from 'react-redux'
import {removeArt, selectSortedArt} from '../store'

const ArtList = () => {
  const dispatch = useDispatch()

  const visible = useSelector(selectSortedArt)

  // what is currently typed into the form, so we can point out a piece
  // that looks like the one being added
  const name = useSelector((state) => state.form.name)

  if (visible.length === 0) {
    return (
      <section className="border-b-4 border-ink p-5">
        <p className="text-sm">Nothing to show.</p>
      </section>
    )
  }

  return (
    <ul className="border-b-4 border-ink">
      {visible.map((art) => {
        // Worked out while rendering. NOT stored on the art object, and
        // not a third slice. It is a fact about right now.
        const isPossibleDuplicate =
          name.trim() !== '' &&
          art.name.toLowerCase().includes(name.trim().toLowerCase())

        return (
          <li
            key={art.id}
            className={`flex flex-wrap items-center justify-between gap-3 border-b-4 border-ink px-5 py-3 last:border-b-0 ${
              isPossibleDuplicate ? 'bg-flat-yellow' : ''
            }`}
          >
            <p className="min-w-0 break-words text-sm font-black uppercase">
              {art.name}{isPossibleDuplicate && <span className="ml-2 text-xs font-normal normal-case">(Possible duplicate)</span>} <span className="font-normal">${art.price}</span>
            </p>

            <button
              onClick={() => dispatch(removeArt(art.id))}
              aria-label={`Delete ${art.name}`}
              className="border-4 border-ink bg-flat-red px-3 py-1 text-xs font-black uppercase text-paper"
            >
              Delete
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default ArtList
