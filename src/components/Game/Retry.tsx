import { FlagDto } from "@/types"
import Button from "@/components/ui/Button"

interface Props {
  flagsGuessed: FlagDto[]
  onGameStart: () => void
}

function Retry ({ flagsGuessed, onGameStart }: Props) {
  function getFlagWordWithEnding (value: number) {
    if (value === 1) {
      return 'флаг'
    }
    const lastEl = parseInt(value.toString().slice(-1))
    if ((value < 10 || value >= 20) && (lastEl >= 2 && lastEl <= 4)) {
      return 'флага'
    }
    return 'флагов'
  }

  return <>
    <div className="p-4 text-center">
      Вы угадали {flagsGuessed.length} { getFlagWordWithEnding(flagsGuessed.length) }
    </div>
    <div className="flex justify-center">
      <Button onClick={onGameStart}>
        Еще раз
      </Button>
    </div>
  </>
}

export default Retry
