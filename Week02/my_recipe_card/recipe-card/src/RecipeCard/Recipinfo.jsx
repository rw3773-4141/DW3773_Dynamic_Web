import {RECIPE_DATA} from './recipe-data.js'
import styles from './RecipeCard.module.css'

const Recipeinfo = (props) => {
    const { title, description } = props
    return (
        <section className={styles.recipe_info}>
            <h2 className={styles.recipe_title}>{title}</h2>
            <p>{description}</p>
        </section>
    )
}

export default Recipeinfo
