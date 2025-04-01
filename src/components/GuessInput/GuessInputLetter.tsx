import classNames from "classnames"
import { useEffect, useRef } from "react"

interface Props {
  value: string
  focused: boolean
  blank: boolean
  onChange: (value: string) => void
  onChangeFocus: (value: 1 | -1) => void
  onFocus: (event: React.FocusEvent) => void
}

function GuessInputLetter ({ value, focused, blank, onChange, onChangeFocus, onFocus }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  
  const lineClass = classNames({
    'bg-red-500': focused,
    'bg-gray-700': !focused,
  })

  useEffect(() => {
    if (inputRef.current) {
      if (focused) {
        inputRef.current.focus()
        inputRef.current.click()
      } else {
        inputRef.current.blur()
      }
    }
  }, [focused])

  function onKeyDown (event: React.KeyboardEvent) {
    setCaretPosition()
    if (event.key === 'ArrowRight') {
      onChangeFocus(1)
    }
    if (event.key === 'ArrowLeft') {
      onChangeFocus(-1)
    }
    if (event.key === 'Backspace' && !value) {
      onChangeFocus(-1)
    }
  }

  function setCaretPosition () {
    const caretPosition = 1
    inputRef.current?.setSelectionRange(caretPosition, caretPosition)
  }

  function onBlur ($event: React.FocusEvent<HTMLElement>) {
    if (
      focused &&
      $event.relatedTarget &&
      $event.relatedTarget.tagName !== 'INPUT' &&
      ($event.relatedTarget as HTMLInputElement).readOnly
    ) {
      inputRef.current?.focus()
    }
  }

  return (
    <>
      <div className="flex first:ml-auto last:mr-auto grow-0 shrink-0 flex-col basis-6 md:basis-10 items-center">
          <div className="flex justify-center p-0.5">
            <input
              ref={inputRef}
              className='text-base md:text-4xl font-bold w-full h-full text-center align-middle outline-none caret-transparent'
              value={value}
              readOnly={blank}
              onChange={event => {onChange(event.target.value.slice(-1) || '')}}
              onKeyDown={event => {onKeyDown(event)}}
              onFocus={event => {onFocus(event)}}
              onBlur={onBlur}
            />
          </div>
          {!blank && <div className={`w-3/4 h-1 rounded-xs ${lineClass}`}></div>}
      </div>
    </>
  )
}

export default GuessInputLetter
