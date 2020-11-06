import React, { useCallback, useState } from "react"
import { Post } from "../controllers/InstaFetcher"

import { Picture } from "./Picture"

const postBatch = 9
interface Props {
  posts: Post[]
}
export const PostsFeed: React.FunctionComponent<Props> = ({
  posts,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [displayedPosts, setDisplayed] = useState<JSX.Element[]>([])
  const [idsIndex, setIdsIndex] = useState<string[]>([])

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

  if (posts.length > 0 && displayedPosts.length === 0) {
    setLoading(true)
  }

  if (loading) {
    loadBatch(displayedPosts.length + postBatch)
    setLoading(false)
  }

  console.log("RENDER FEED")
  return (
    <div style={{ width: "28rem" }}>
      <div className="text-xl font-yogasanspro tracking-tight text-grey-lt-1 px-1 pb-2">
        🏔 monogatari de la Montagne Enneigée
      </div>
      {displayedPosts}
      <div onClick={() => setLoading(true)}>Charger plus</div>
    </div>
  )
}
