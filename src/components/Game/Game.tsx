import { useEffect, useRef, useState } from "react"
import Flag from "@/components/Flag"
import GuessInput from "@/components/GuessInput/GuessInput"
import Timer from "@/components/Timer"
import { FlagDto, GuessStatus } from "@/types"
import flagsJSON from '@/utils/flags.json'
import Button from "@/components/ui/Button"

interface Props {
  onGameEnd: (flagsGuessed: FlagDto[]) => void
}

function Game ({ onGameEnd }: Props) {
  const TIME_TOTAL = 20000
  const flags = useRef<FlagDto[]>(flagsJSON)
  const timerValue = useRef(TIME_TOTAL)
  const [currentFlag, setCurrentFlag] = useState<FlagDto | null>(null)
  const [flagsGuessed, setFlagsGuessed] = useState<FlagDto[]>([])
  const [guessStatus, setGuessStatus] = useState<GuessStatus | null>(null)

  useEffect(() => {
    setCurrentFlag(getRandomFlag(flags.current))
  }, [flags])

  function getRandomFlag (flags: FlagDto[]) {
    const randIndex = Math.round(Math.random() * (flags.length - 1))
    return flags[randIndex]
  }

  function removeFlag (flag: FlagDto) {
    flags.current = flags.current.filter(item => item.code !== flag.code)
    if (!flags.current.length) {
      onGameEnd(flagsGuessed)
    }
  }

  function onFailGuess () {
    if (currentFlag) {
      setGuessStatus('FAIL')
      timerValue.current = 0
      window.setTimeout(() => {
        removeFlag(currentFlag)
        setCurrentFlag(getRandomFlag(flags.current))
        timerValue.current = TIME_TOTAL
        setGuessStatus(null)
      }, 2000)
    }
  }

  function onSuccessGuess () {
    if (currentFlag) {
      setGuessStatus('SUCCESS')
      timerValue.current = 0
      setFlagsGuessed(val => [...val, currentFlag])
      window.setTimeout(() => {
        timerValue.current = TIME_TOTAL
        removeFlag(currentFlag)
        setCurrentFlag(getRandomFlag(flags.current))
        setGuessStatus(null)
      }, 1000)
    }
  }

  return (
    <>
      { currentFlag &&
        <>
          <Timer
            value={timerValue.current}
            paused={guessStatus === 'SUCCESS' || guessStatus === 'FAIL'}
            timeTotal={TIME_TOTAL}
            onTimeIsUp={onFailGuess}  
          />
          <Flag code={currentFlag.code} />
          <GuessInput
            isShown={guessStatus === 'FAIL'}
            value={currentFlag.name}
            onSuccess={onSuccessGuess}
          />
          <div className="text-center text-2xl py-4">
            {flagsGuessed.length}
          </div>
        </>
      }
      <div className="flex flex-col items-center gap-4">
        <Button disabled={!!guessStatus} onClick={onFailGuess}>
          Пропустить
        </Button>
        <Button onClick={() => { onGameEnd(flagsGuessed) }}>
          Завершить
        </Button>
      </div>
    </>
  )
}

export default Game
