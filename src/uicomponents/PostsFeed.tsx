import React, { useState } from "react"
import { Post } from "../controllers/InstaFetcher"
import { Picture } from "./Picture"

const postBatch = 9
interface Props {
  hashtag: string
  posts: Post[]
}
export const PostsFeed: React.FunctionComponent<Props> = (
  props: Props
) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [displayedPosts, setDisplayed] = useState<JSX.Element[]>([])
  const [idsIndex, setIdsIndex] = useState<string[]>([])

  const loadBatch = (limit: number) => {
    const newPosts: JSX.Element[] = []
    const newIds: string[] = []

    props.posts.forEach((post, index) => {
      if (index < limit && !idsIndex.includes(post.id)) {
        newPosts.push(<Picture key={post.id} {...post} />)
        newIds.push(post.id)
      }
    })

    setDisplayed([...displayedPosts, ...newPosts])
    setIdsIndex([...idsIndex, ...newIds])
  }

  if (props.posts.length > 0 && displayedPosts.length === 0) {
    setLoading(true)
  }

  if (loading) {
    loadBatch(displayedPosts.length + postBatch)
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center overflow-y-auto">
      <div className="max-w-md">
        <div className="text-xl font-yogasanspro tracking-tight text-grey-lt-1 px-1 pb-2">
          🏔 monogatari de la Montagne Enneigée
        </div>

        {displayedPosts}
        <div onClick={() => setLoading(true)}>Charger plus</div>
      </div>
    </div>
  )
}
