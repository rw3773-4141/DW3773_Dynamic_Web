import cx from 'classnames'
import styles from './Card.module.css'
import CardPattern from '../assets/moroccan-flower-dark.png'

const Card = (props) => {
  const {card, handleChoice, flipped, disabled} = props

  const handleClick = () => {
    handleChoice(card)
  }

  return (
    <div className={styles.card}>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || flipped}
        aria-label={flipped ? 'Face-up card' : 'Face-down card'}
        aria-pressed={Boolean(flipped)}
        className={cx(styles.inner, {[styles.flipped]: flipped})}
      >
        <div className={styles.front}>
          <img src={CardPattern} alt="" />
        </div>
        <div className={styles.back}>
          <img src={card.src} alt="" />
        </div>
      </button>
    </div>
  )
}

export default Card
