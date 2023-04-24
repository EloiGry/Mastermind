import { Link } from "react-router-dom"
import Header from "../components/Header"
import { useStore } from "../slice/ResultSlice";


function App() {
  const responseData = useStore(state => state.responseData)
  console.log(responseData);

  return (
    <>
      <Header/>
      <div className="h-[90vh] bg-lightBrown text-white text-center">
        <h1> Mastermind </h1>
        <button className="border-2 border-white py-2 px-6 rounded-sm">
          <Link to='/play'> Play </Link>
        </button>
      </div>
    </>
  )
}

export default App
