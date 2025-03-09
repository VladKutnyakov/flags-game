interface Props {
  value: string
  onChange: (value: string) => void
}

function GuessInputLetter ({ value, onChange }: Props) {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex justify-center p-1">
          <input
            className={'text-3xl font-bold w-3/4 h-full text-center align-middle outline-none'}
            value={value}
            onChange={event => {onChange(event.target.value.slice(-1) || '')}}
          />
        </div>
        <div className="w-3/4 h-0.5 bg-gray-700"></div>
      </div>
    </>
  )
}

export default GuessInputLetter
