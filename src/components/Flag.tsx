interface Props {
  code: string
}

function Flag({ code }: Props) {
  const BASE_URL = import.meta.env.BASE_URL

  return (
    <>
      <div className="flex justify-center py-4">
        <img className="w-1/2 outline-solid outline-black" src={`${BASE_URL}flags/${code}.svg`} />
      </div>
    </>
  )
}

export default Flag
