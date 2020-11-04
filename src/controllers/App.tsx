import React from "react"
import "../assets/styles/tailwind.output.css"
import { DaylightBackground } from "../uicomponents/DaylightBackground"
import { Header } from "../uicomponents/Header"
import { PostsFeed } from "../uicomponents/PostsFeed"
import { InstaFetcher } from "./InstaFetcher"
import { Session } from "./Session"

const App: React.FunctionComponent<{}> = () => {
  return (
    <div className="h-screen w-full flex">
      <Session>
        <InstaFetcher
          hashtag="chamonix"
          main
          render={({ contentsLoaded, posts }) => (
            <DaylightBackground contentsLoaded={contentsLoaded}>
              <Header />
              <PostsFeed posts={posts} hashtag="chamonix" />
            </DaylightBackground>
          )}
        />
      </Session>
    </div>
  )
}

export default App
