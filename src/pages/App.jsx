import { Link } from "react-router-dom"
import Header from "../components/Header"


function App() {

  return (
    <div className="font-patrick">
      <Header/>
      <div className="h-[90vh] bg-lightBrown text-white text-center flex flex-col items-center gap-4">
        <h1 className="bg-gradient-to-r from-blue via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-3xl font-semibold"> Mastermind </h1>
        <Link to='/play' className="border-2 border-white py-1 px-3 rounded-sm w-32 hover:border-indigo-400 hover:text-indigo-400 duration-300"> Play </Link>
      </div>
    </div>
  )
}

export default App
