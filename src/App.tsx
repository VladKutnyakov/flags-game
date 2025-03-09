import Flag from "./components/Flag"
import GuessInput from "./components/GuessInput/GuessInput"
import Timer from "./components/Timer"

function App () {

  return (
    <>
      <div className="p-[10%] flex flex-col">
        <Timer />
        <Flag />
        <GuessInput word={'Мадагаскар'} />
      </div>
    </>
  )
}

export default App
