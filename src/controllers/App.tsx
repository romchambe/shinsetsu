import React from "react"
import "../assets/styles/tailwind.output.css"
import { InstaFetcher } from "./InstaFetcher"

const App: React.FunctionComponent<{}> = () => {
  return (
    <div className="h-screen w-full flex">
      <InstaFetcher hashtag="chamonix" />
    </div>
  )
}

export default App
