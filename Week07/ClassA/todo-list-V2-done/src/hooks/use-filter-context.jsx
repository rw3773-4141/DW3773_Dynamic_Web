import {useContext} from 'react'
import FilterContext from '../context/filter'

const useFilterContext = () => {
  const context = useContext(FilterContext)
  if (!context) throw new Error('useFilterContext must be used inside FilterProvider')
  return context
}

export default useFilterContext
