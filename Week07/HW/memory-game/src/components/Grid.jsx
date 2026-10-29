import {useState, useEffect} from 'react'
import Card from './Card'
import Bilbo from '../assets/bilbo-baggins.png'
import Cameron from '../assets/cameron-poe.png'
import Nikki from '../assets/nikki-cage.png'
import Pollux from '../assets/pollux-troy.png'

const cardImages = [{src: Bilbo}, {src: Cameron}, {src: Nikki}, {src: Pollux}]

const Grid = () => {
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [turns, setTurns] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [won, setWon] = useState(false)

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: crypto.randomUUID()}))

    setCards(shuffled)
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setTurns(0)
    setWon(false)
  }

  const handleChoice = (card) => {
    // Ignore a third click, a second click on the same card, and matched cards.
    if (disabled || choiceTwo || card === choiceOne || card.matched) {
      return
    }

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setTurns((prevTurns) => prevTurns + 1)
  }

  // An empty deck must not count as a win: every() is true for an empty array.
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setWon(true)
    }
  }, [cards])

  // State updates in handleChoice appear on the next render. Compare the two
  // choices here, after both values have changed.
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            }
            return card
          })
        })
        resetTurn()
      } else {
        // Keep a mismatch visible long enough to see it. If New Game is
        // pressed first, the cleanup cancels this old turn's timer.
        const timer = setTimeout(() => resetTurn(), 1200)
        return () => clearTimeout(timer)
      }
    }
  }, [choiceOne, choiceTwo])

  return (
    <>
      <button
        onClick={shuffleCards}
        className="bg-blue-900 text-white uppercase px-8 py-4 rounded-lg mb-6"
      >
        New Game
      </button>

      <p className="mb-6 text-lg">Turns used: {turns}</p>

      {won && (
        <p className="mb-6 text-2xl font-bold text-green-700">
          You cleared the board in {turns} turns.
        </p>
      )}

      <div className="grid grid-cols-4 gap-4 max-w-3xl">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </>
  )
}

export default Grid
