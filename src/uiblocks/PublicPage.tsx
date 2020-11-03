import React, { useContext } from "react"
import { SessionContext } from "../contexts/SessionContext"
import { InstaFetcher } from "../controllers/InstaFetcher"
import { DaylightBackground } from "../uicomponents/DaylightBackground"
import { Header } from "../uicomponents/Header"
import { Timer } from "../uicomponents/Timer"
import { PostsFeed } from "../uicomponents/PostsFeed"

export const PublicPage: React.FunctionComponent = () => {
  const session = useContext(SessionContext)

  return (
    <DaylightBackground>
      <Header />
      <div className="flex w-full justify-center">
        <Timer value={session.timer} />
      </div>
      <InstaFetcher
        hashtag={"chamonix"}
        render={({ posts }) => <PostsFeed posts={posts} />}
      />
    </DaylightBackground>
  )
}
