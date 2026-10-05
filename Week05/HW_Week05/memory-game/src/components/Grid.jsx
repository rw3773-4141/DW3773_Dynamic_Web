/*
  Effect dependency choices:
  - [cards] checks whether every card is matched whenever a match updates the deck.
  - [choiceOne, choiceTwo] compares a pair only after either selected card changes.
  - [won, turns, bestScore] updates the session best score only after a completed game
    has a final turn count. New Game deliberately does not change bestScore.
*/
import {useState, useEffect} from 'react'
import Card from './Card'
import Plant from '../assets/plant.png'
import Cassette from '../assets/cassette.png'
import Joystick from '../assets/joystick.png'
import Camera from '../assets/camera.png'

const cardImages = [{src: Plant}, {src: Cassette}, {src: Joystick}, {src: Camera}]

const Grid = () => {
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [turns, setTurns] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [won, setWon] = useState(false)
  const [bestScore, setBestScore] = useState(null)

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: crypto.randomUUID()}))

    setCards(shuffled)
    setTurns(0)
    setWon(false)
  }

  const handleChoice = (card) => {
    if (disabled || card === choiceOne || card.matched) {
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

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setWon(true)
    }
  }, [cards])

  useEffect(() => {
    if (won && (bestScore === null || turns < bestScore)) {
      setBestScore(turns)
    }
  }, [won, turns, bestScore])

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
        setTimeout(() => resetTurn(), 1200)
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
      <p className="mb-6 text-lg">
        Best score this session: {bestScore === null ? 'No completed game yet' : bestScore}
      </p>

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
          />
        ))}
      </div>
    </>
  )
}

export default Grid
