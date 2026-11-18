import {useSelector, useDispatch} from 'react-redux'
import {removeArt} from '../store'

const ArtList = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.art.data)

  if (data.length === 0) {
    return (
      <section className="border-b-4 border-ink p-5">
        <p className="text-sm">Nothing in the collection yet.</p>
      </section>
    )
  }

  return (
    <ul className="border-b-4 border-ink">
      {data.map((art) => {
        return (
          <li
            key={art.id}
            className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-ink px-5 py-3 last:border-b-0"
          >
            <p className="min-w-0 break-words text-sm font-black uppercase">
              {art.name} <span className="font-normal">${art.price}</span>
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
