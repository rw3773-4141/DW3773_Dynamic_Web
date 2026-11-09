import {useSelector} from 'react-redux'
import {selectCartCount, selectCartTotal} from '../features/cartSlice.js'
import {selectFavouriteCount} from '../features/favouritesSlice.js'

const Header = () => {
  const count = useSelector(selectCartCount)
  const total = useSelector(selectCartTotal)
  const favouriteCount = useSelector(selectFavouriteCount)

  return (
    <header className="border-b-4 border-ink">
      <div className="mx-auto flex max-w-5xl flex-wrap items-stretch border-x-4 border-ink sm:flex-nowrap">
        <h1 className="w-full px-5 py-4 text-2xl font-black uppercase tracking-tight sm:flex-1">
          Bauhaus Prints
        </h1>
        <div className="flex flex-1 flex-col items-center justify-center border-t-4 border-ink bg-paper px-3 py-3 sm:flex-none sm:border-t-0 sm:border-l-4">
          <span className="text-xs font-black uppercase">Favourites</span>
          <span className="text-2xl font-black" aria-live="polite">{favouriteCount}</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center border-t-4 border-l-4 border-ink bg-flat-yellow px-4 py-3 sm:flex-none sm:border-t-0">
          <span className="text-xs font-black uppercase">In cart</span>
          <span className="text-2xl font-black" aria-live="polite">{count}</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center border-t-4 border-l-4 border-ink bg-flat-blue px-4 py-3 text-paper sm:flex-none sm:border-t-0">
          <span className="text-xs font-black uppercase">Total</span>
          <span className="text-xl font-black">${total}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
