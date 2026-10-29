const filters = [
  {value: 'all', label: 'All'},
  {value: 'next', label: 'Next'},
  {value: 'later', label: 'Later'},
  {value: 'someday', label: 'Someday'},
]

const PriorityFilter = ({filter, onChange}) => {
  return (
    <div className="filter-buttons" role="group" aria-label="Filter books by reading priority">
      {filters.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={filter === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default PriorityFilter
