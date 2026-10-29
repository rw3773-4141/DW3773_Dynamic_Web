import RestaurantItem from './RestaurantItem'

const RestaurantList = ({restaurants, onDelete, onEdit, onToggle}) => {
  return (
    <ul className="restaurant-list">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </ul>
  )
}

export default RestaurantList
