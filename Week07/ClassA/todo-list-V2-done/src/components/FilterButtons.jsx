import useFilterContext from '../hooks/use-filter-context'

const FilterButtons = () => {
  const {filter, setFilter} = useFilterContext()

  return (
    <div className="flex gap-2 mb-4" role="group" aria-label="Filter todos">
      {['all', 'active', 'done'].map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setFilter(option)}
          aria-pressed={filter === option}
          className={`rounded px-4 py-2 capitalize ${filter === option ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default FilterButtons
