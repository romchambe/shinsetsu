import React, { useCallback, useContext, useEffect, useState } from "react"
import { animated, useSpring } from "react-spring"
import { ScrollContext } from "../contexts/ScrollContext"
import { Post } from "../controllers/InstaFetcher"
import { Picture } from "./Picture"
import Loader from "react-loader-spinner"
import { Hero } from "./Hero"

const postBatch = 9
interface Props {
  posts: Post[]
  contentsLoaded: boolean
}
export const PostsFeed: React.FunctionComponent<Props> = ({
  posts,
  contentsLoaded,
}: Props) => {
  const [displayedPosts, setDisplayed] = useState<JSX.Element[]>([])
  const [idsIndex, setIdsIndex] = useState<string[]>([])
  const { shouldReload, deactivateReload } = useContext(ScrollContext)

  const backgroundOpacity = useSpring({
    opacity: contentsLoaded ? 1 : 0,
  })

  const loadBatch = useCallback(
    (limit: number) => {
      const newPosts: JSX.Element[] = []
      const newIds: string[] = []

      posts.forEach((post, index) => {
        if (index < limit && !idsIndex.includes(post.id)) {
          newPosts.push(<Picture key={post.id} {...post} />)
          newIds.push(post.id)
        }
      })

      setDisplayed([...displayedPosts, ...newPosts])
      setIdsIndex([...idsIndex, ...newIds])
    },
    [posts]
  )

  useEffect(() => {
    loadBatch(displayedPosts.length + postBatch)
    deactivateReload()
  }, [shouldReload])

  if (posts.length > 0 && displayedPosts.length === 0) {
    loadBatch(displayedPosts.length + postBatch)
  }

  return contentsLoaded ? (
    <animated.div
      className="w-5/6 md:w-1/2 lg:w-1/3"
      style={backgroundOpacity}
    >
      <div className="lg:hidden block">
        <Hero contentsLoaded={contentsLoaded} />
      </div>

      {displayedPosts.length > 0 ? (
        <div
          className="text-xl font-yogasanspro tracking-tight lg:text-left text-center text-md px-1 pb-2"
          style={{ letterSpacing: "-0.3px" }}
        >
          🏔 monogatari de la Montagne (#chamonix)
        </div>
      ) : null}

      {displayedPosts}
    </animated.div>
  ) : (
    <animated.div className="flex flex-col items-center w-64">
      <Loader
        type="Audio"
        color="#9a82e6"
        height={32}
        width={32}
        timeout={5000} //3 secs
      />
      <div
        className="text-center mt-6 text-text-md"
        style={{ letterSpacing: "-0.3px" }}
      >
        la nuit venue, la neige fraîche refléta les astres dans un
        silencieux scintillement
      </div>
    </animated.div>
  )
}
