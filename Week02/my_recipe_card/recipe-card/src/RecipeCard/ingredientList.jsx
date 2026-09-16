import styles from './RecipeCard.module.css'

const IngredientList = ({ ingredients }) => {
  return (
    <section className={styles.ingredients_list}>
      <h3 className={styles.list_title}>Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li className={styles.list_item} key={index}>
            <span className={styles.measure}>{ingredient.Measure}</span>
            <span>{ingredient.Name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default IngredientList
