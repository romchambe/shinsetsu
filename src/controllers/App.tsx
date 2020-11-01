import React from "react"
import "../assets/styles/tailwind.output.css"
import { Header } from "../uicomponents/Header"
import { Session } from "./Session"

const App: React.FunctionComponent<{}> = () => {
  return (
    <div className="h-screen w-full flex bg-blue">
      <Session>
        <Header />
      </Session>
    </div>
  )
}

export default App
