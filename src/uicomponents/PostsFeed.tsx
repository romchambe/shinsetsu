import React, { useCallback, useContext, useEffect, useState } from "react"
import { animated, useSpring } from "react-spring"
import { ScrollContext } from "../contexts/ScrollContext"
import { Post } from "../controllers/InstaFetcher"
import { Picture } from "./Picture"

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

  console.log("RENDER FEED", backgroundOpacity)
  return contentsLoaded ? (
    <animated.div style={{ ...{ width: "28rem" }, ...backgroundOpacity }}>
      {displayedPosts.length > 0 ? (
        <div className="text-xl font-yogasanspro tracking-tight text-grey-lt-1 px-1 pb-2">
          🏔 monogatari de la Montagne Enneigée
        </div>
      ) : null}
      {displayedPosts}
    </animated.div>
  ) : (
    <animated.div style={{ width: "28rem" }}></animated.div>
  )
}
