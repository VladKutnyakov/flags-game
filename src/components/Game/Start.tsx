import Button from "@/components/ui/Button"

interface Props {
  onGameStart: () => void
}

function Start ({ onGameStart }: Props) {
  return <>
    <div className="flex justify-center">
      <Button onClick={onGameStart}>Начать</Button>
    </div>
  </>
}

export default Start
