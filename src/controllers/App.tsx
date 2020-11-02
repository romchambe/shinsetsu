import React from "react"
import "../assets/styles/tailwind.output.css"
import { PublicPage } from "../uiblocks/PublicPage"
import { Session } from "./Session"

const App: React.FunctionComponent<{}> = () => {
  return (
    <div className="h-screen w-full flex bg-blue">
      <Session>
        <PublicPage />
      </Session>
    </div>
  )
}

export default App
