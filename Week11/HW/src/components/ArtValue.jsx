import {useSelector} from 'react-redux'
import {selectTotalValue, selectVisibleCount} from '../store'

const ArtValue = () => {
  const total = useSelector(selectTotalValue)
  const count = useSelector(selectVisibleCount)

  return (
    <section aria-live="polite" className="flex flex-wrap items-center justify-between gap-3 bg-ink px-5 py-3 text-paper">
      <span className="text-xs font-black uppercase tracking-widest">
        Total value
      </span>
      <span className="text-lg font-black">
        {count} {count === 1 ? 'piece' : 'pieces'}, ${total.toLocaleString('en-US')}
      </span>
    </section>
  )
}

export default ArtValue
