import React, { Component } from "react"
import miniget from "miniget"
import { PostsFeed } from "../uicomponents/PostsFeed"
import { DaylightBackground } from "../uicomponents/DaylightBackground"
import { Header } from "../uicomponents/Header"
import { Session } from "../controllers/Session"

interface Props {
  hashtag: string
  main?: boolean
}

interface State {
  contentsLoaded: boolean
  posts: Post[]
}

export interface PostsList {
  posts: Post[]
}

interface InstaImage {
  src: string
  config_width: number
  config_height: number
}

export interface Post {
  images: InstaImage
  timestamp: number
  description: string
  id: string
}

export class InstaFetcher extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      posts: [],
      contentsLoaded: false,
    }
  }

  async componentDidMount(): Promise<void> {
    const insta = await miniget(
      `https://instagram.com/explore/tags/${this.props.hashtag}/`
    ).text()

    const data = parseHtml(insta)
    const posts = extractPostsData(data)

    this.setState({ posts, contentsLoaded: true })
  }

  render(): JSX.Element {
    return this.state.contentsLoaded ? (
      <Session>
        <DaylightBackground>
          <Header />
          <PostsFeed
            posts={this.state.posts}
            hashtag={this.props.hashtag}
          />
        </DaylightBackground>
      </Session>
    ) : (
      <Header />
    )
  }
}

function parseHtml(data: string): unknown {
  const index = matchOrThrow(data, "entry_data")

  const dataObj = data.substring(index)

  const targetObject = ["{"]

  try {
    let charCounter = 0
    let closureCount = 1

    const openClosure = dataObj.substring(matchOrThrow(dataObj, "{") + 1)
    const chars = openClosure.split("")

    while (closureCount > 0) {
      if (chars[charCounter] === "{") {
        closureCount += 1
      }

      if (chars[charCounter] === "}") {
        closureCount -= 1
      }

      if (closureCount > 0) {
        targetObject.push(chars[charCounter])
      }

      charCounter += 1
    }
    targetObject.push("}")
  } catch (error) {
    console.error(error)
  }

  return JSON.parse(targetObject.join(""))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractPostsData(rawPosts: any): Post[] {
  let posts =
    rawPosts.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts = posts.map((rawPost: any) => {
    const { node } = rawPost
    const { id } = node
    const timestamp = node.taken_at_timestamp
    let description = ""
    try {
      description = node.edge_media_to_caption.edges[0].node.text
    } catch (error) {
      console.error(error, node)
    }

    const images = node.thumbnail_resources.reduce(
      (prev: InstaImage, current: InstaImage) => {
        return prev.config_width < current.config_width ? current : prev
      }
    )

    return { timestamp, images, description, id }
  })

  posts.sort((a: Post, b: Post) => b.timestamp - a.timestamp)
  return posts
}

function matchOrThrow(data: string, target: string) {
  const match = data.match(target)

  if (!!match && !!match.index) {
    return match.index
  } else {
    throw new Error("no data")
  }
}
