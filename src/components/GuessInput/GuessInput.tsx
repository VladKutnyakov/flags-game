import { useEffect, useState } from "react"
import GuessInputLetter from "./GuessInputLetter/GuessInputLetter"
import classNames from "classnames"

interface Props {
  word: string
}

function GuessInput ({ word }: Props) {
  const [userGuess, setUserGuess] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState(false)

  const guessInputClass = classNames({
    'flex': true,
    'border-6': isCorrect,
    'border-solid': isCorrect,
    'border-green-500': isCorrect,
    'rounded-md': isCorrect,
  })

  useEffect(() => {
    setUserGuess(word.split('').map(() => ''))
  }, [word])

  useEffect(() => {
    setIsCorrect(userGuess.join('') === word)
  }, [userGuess, word])

  return (
    <>
      <div className={guessInputClass}>
        {userGuess.map((letter, index) => 
          <GuessInputLetter
            value={letter}
            key={index}
            onChange={event => {setUserGuess(() => userGuess.toSpliced(index, 1, event))}}
          />
        )}
      </div>
    </>
  )
}

export default GuessInput
