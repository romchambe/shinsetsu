import React, { useState } from "react"
import "../assets/styles/tailwind.output.css"
import { DaylightBackground } from "../uicomponents/DaylightBackground"
import { Header } from "../uicomponents/Header"
import { PostsFeed } from "../uicomponents/PostsFeed"
import { InstaFetcher } from "./InstaFetcher"
import { ScrollController } from "./ScrollController"
import { Session } from "./Session"

const App: React.FunctionComponent<{}> = () => {
  const [contentScrolled, setContentScrolled] = useState<boolean>(false)
  return (
    <div className="h-screen w-full flex">
      <Session>
        <InstaFetcher
          hashtag="chamonix"
          main
          render={({ contentsLoaded, posts }) => (
            <DaylightBackground contentsLoaded={contentsLoaded}>
              <Header contentScrolled={contentScrolled} />
              <ScrollController setContentScrolled={setContentScrolled}>
                <PostsFeed posts={posts} />
              </ScrollController>
            </DaylightBackground>
          )}
        />
      </Session>
    </div>
  )
}

export default App
