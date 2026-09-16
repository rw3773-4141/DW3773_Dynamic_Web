import styles from './RecipeCard.module.css'

const RecipeImg = (props) => {
    const { imgSrc, imgAlt } = props
    return <img className={styles.img} src={imgSrc} alt={imgAlt} />
}

export default RecipeImg


//props = {
//  imgSrc: 'path/to/image.jpg',
//  imgAlt: 'description of image'
//}
