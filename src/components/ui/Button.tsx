export interface Props {
  children: React.ReactNode
  disabled?: boolean
  onClick: React.EventHandler<React.MouseEvent>
}

function Button ({ children, disabled, onClick }: Props) {
  return <>
    <button
      className="px-4 py-2 w-fit border rounded-md font-medium cursor-pointer"
      disabled={disabled}
      onClick={onClick}
    >
      { children }
    </button>
  </>
}

export default Button