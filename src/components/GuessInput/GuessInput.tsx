import { useEffect, useState } from "react"
import GuessInputLetter from "./GuessInputLetter"

interface Props {
  value: string
  isShown: boolean
  onSuccess: () => void
}

function GuessInput ({ isShown, value, onSuccess }: Props) {
  const [userGuess, setUserGuess] = useState<string[]>([])
  const [focusedIndex, setFocusedIndex] = useState(0)

  useEffect(() => {
    if (isShown) {
      setUserGuess(value.split(''))
    } else {
      setUserGuess(() => value.split('').map(item => item === ' ' ? item : ''))
      setFocusedIndex(0)
    }
  }, [isShown, value])

  function changeFocus (diff: 1 | -1) {
    let newFocusedIndex = focusedIndex + diff
    if (diff === 1 && focusedIndex !== userGuess.length - 1) {
      while (newFocusedIndex !== userGuess.length - 1 && value[newFocusedIndex] === ' ') {
        newFocusedIndex += diff
      }
      setFocusedIndex(newFocusedIndex)
    }
    if (diff === -1 && focusedIndex !== 0) {
      while (newFocusedIndex !== 0 && value[newFocusedIndex] === ' ') {
        newFocusedIndex += diff
      }
      setFocusedIndex(newFocusedIndex)
    }
  }

  function onChangeLetter (event: string, index: number) {
    const newUserGuess = userGuess.toSpliced(index, 1, event)
    setUserGuess(newUserGuess)
    if (newUserGuess.join('').toLocaleLowerCase() === value.toLocaleLowerCase()) {
      onSuccess()
    } else if (event) {
      changeFocus(1)
    }
  }

  return (
    <>
      <div className='flex overflow-x-auto py-2'>
        {userGuess.map((letter, index) =>
          <GuessInputLetter
            value={letter}
            key={index}
            focused={focusedIndex === index}
            blank={value[index] === ' '}
            onChange={event => {onChangeLetter(event, index)}}
            onChangeFocus={event => {changeFocus(event)}}
            onFocus={() => {setFocusedIndex(index)}}
          />
        )}
      </div>
    </>
  )
}

export default GuessInput
