import { RECIPE_DATA } from './recipe-data.js'
import RecipeImg from './recipeimg.jsx'
import Recipeinfo from './Recipinfo.jsx'
import IngredientList from './ingredientList.jsx'
import InstructionList from './instructionList.jsx'
import Card from './Card.jsx'
import styles from './RecipeCard.module.css'
import UserRating from './UserRating.jsx'

const RecipeCard = () => {
  return (
    <Card>
      <RecipeImg imgSrc={RECIPE_DATA.imgSrc} imgAlt={RECIPE_DATA.imgAlt} />
      <div className={styles.card_text}>
        <Recipeinfo title={RECIPE_DATA.title} description={RECIPE_DATA.description} />
        <div className={styles.card_lists}>
          <IngredientList ingredients={RECIPE_DATA.ingredients} />
          <InstructionList instructions={RECIPE_DATA.instructions} />
          
        </div>
        <UserRating />
      </div>
    </Card>
  )
}

export default RecipeCard
