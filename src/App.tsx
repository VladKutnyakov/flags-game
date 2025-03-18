import Game from "@/components/Game/Game"
import Retry from "@/components/Game/Retry"
import Start from "@/components/Game/Start"
import { useState } from "react"
import { FlagDto } from "./types"

type GameState = 'START' | 'GAME' | 'RETRY'

function App () {
  const [gameState, setGameState] = useState<GameState>('START')
  const [flagsGuessed, setFlagsGuessed] = useState<FlagDto[]>([])

  function onGameEnd (flags: FlagDto[]) {
    setFlagsGuessed(flags)
    setGameState('RETRY')
  }

  function getCurrentScreen () {
    switch (gameState) {
      case 'GAME':
        return <Game onGameEnd={onGameEnd} />
      case 'START':
        return <Start onGameStart={() => { setGameState('GAME') }} />
      case 'RETRY':
        return <Retry flagsGuessed={flagsGuessed} onGameStart={() => { setGameState('GAME') }} />
    }
  }

  return (
    <>
      <div className="px-[10%] lg:px-[20%] h-screen flex flex-col justify-center">
        {getCurrentScreen()}
      </div>
    </>
  )
}

export default App
