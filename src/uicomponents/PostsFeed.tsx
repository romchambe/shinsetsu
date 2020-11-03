import React from "react"
import { PostsList } from "../controllers/InstaFetcher"

export const PostsFeed = (props: PostsList) => {
  return (
    <div className="flex w-full mt-8 flex-col items-center">
      {props.posts.map((post, index) => (
        <img
          key={`img-${index}`}
          src={post.images.src}
          alt={post.description}
          style={{ width: 320, height: 320, marginBottom: 16 }}
        />
      ))}
    </div>
  )
}
