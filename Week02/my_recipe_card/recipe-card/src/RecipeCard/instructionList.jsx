import styles from './RecipeCard.module.css'

const InstructionList = ({ instructions }) => {
  return (
    <section className={styles.instructions_list}>
      <h3 className={styles.list_title}>Instructions:</h3>
      <ol>
        {instructions.map((instruction, index) => (
          <li className={styles.list_item} key={index}>
            {instruction}
          </li>
        ))}
      </ol>
    </section>
  )
}

export default InstructionList
