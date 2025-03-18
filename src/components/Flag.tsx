interface Props {
  code: string
}

function Flag({ code }: Props) {
  return (
    <>
      <div className="flex justify-center py-4">
        <img className="w-1/2 outline-solid outline-black" src={`/src/assets/svg/flags/${code}.svg`} />
      </div>
    </>
  )
}

export default Flag
