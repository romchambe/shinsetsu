import React from "react"
import "../styles/tailwind.output.css"
import { Session } from "./Session"

const App: React.FunctionComponent<null> = () => {
  return (
    <div className="h-screen w-full flex bg-blue">
      <Session></Session>
    </div>
  )
}

export default App
