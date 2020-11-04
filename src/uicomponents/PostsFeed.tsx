import React, { useState } from "react"
import { PostsList } from "../controllers/InstaFetcher"

const postBatch = 9

export const PostsFeed: React.FunctionComponent<PostsList> = (
  props: PostsList
) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [displayedPosts, setDisplayed] = useState<JSX.Element[]>([])
  const [idsIndex, setIdsIndex] = useState<string[]>([])

  const loadBatch = (limit: number) => {
    const newPosts: JSX.Element[] = []
    const newIds: string[] = []

    props.posts.forEach((post, index) => {
      if (index < limit && !idsIndex.includes(post.id)) {
        newPosts.push(
          <div key={post.id} className="mb-4">
            <img
              src={post.images.src}
              alt={post.description}
              style={{
                width: 320,
                height: 320,
                marginBottom: 8,
                objectFit: "contain",
              }}
            />
            {new Date(post.timestamp * 1000).toLocaleString()}
          </div>
        )

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
    <div className="flex w-full mt-8 flex-col items-center overflow-y-auto">
      {displayedPosts}
      <div onClick={() => setLoading(true)}>Charger plus</div>
    </div>
  )
}
