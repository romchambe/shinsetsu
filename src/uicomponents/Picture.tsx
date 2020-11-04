import React from "react"
import { Post } from "../controllers/InstaFetcher"

export const Picture: React.FunctionComponent<Post> = (props) => {
  return (
    <div className="block mb-4 rounded bg-white border border-yellow-border">
      <div className="font-yogasanspro py-4 px-3  font-bold text-black">
        {getRelativeTime(props.timestamp)}
      </div>
      <img
        src={props.images.src}
        alt={props.description}
        style={{
          width: "28rem",
          height: "28rem",
          objectFit: "contain",
        }}
      />
      <div
        className="font-yogasanspro py-3 px-3 text-grey-lt-1 overflow-hidden"
        style={{ maxHeight: "8.5rem" }}
      >
        {props.description}
      </div>
    </div>
  )
}

function getRelativeTime(timestamp: number): string {
  const now = Date.now()
  const post = timestamp * 1000
  const formatter = new Intl.RelativeTimeFormat("fr")
  if (now - post < 3600000) {
    const numberOfMinutes = Math.round((post - now) / 60000)
    return formatter.format(numberOfMinutes, "minutes")
  }
  if (now - post < 864000000) {
    const numberOfHours = Math.round((post - now) / 3600000)
    return formatter.format(numberOfHours, "hours")
  }

  const numberOfDays = Math.round((post - now) / 86400000)
  return formatter.format(numberOfDays, "days")
}
