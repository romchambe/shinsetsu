import { Component } from "react"
import miniget from "miniget"

interface Props {
  hashtag: string
  render: (data: PostsList) => JSX.Element
}

export interface PostsList {
  posts: Post[]
}

export interface Post {
  images: { src: string; config_width: number; config_height: number }
  timestamp: number
  description: string
}

export class InstaFetcher extends Component<Props, PostsList> {
  constructor(props: Props) {
    super(props)
    this.state = {
      posts: [],
    }
  }

  async componentDidMount(): Promise<void> {
    const insta = await miniget(
      `https://instagram.com/explore/tags/${this.props.hashtag}/`
    ).text()

    const data = parseHtml(insta)
    console.log(data)
    const posts = extractPostsData(data)
    this.setState({ posts })
  }

  render(): JSX.Element {
    return this.props.render({ posts: this.state.posts })
  }
}

function parseHtml(data: string): any {
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

function extractPostsData(rawPosts: any): Post[] {
  let posts =
    rawPosts.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges

  posts = posts.map((rawPost: any) => {
    const { node } = rawPost
    const timestamp = node.taken_at_timestamp
    const images = node.thumbnail_resources.reduce(
      (prev: any, current: any) => {
        return prev.config_width < current.config_width ? current : prev
      }
    )
    const description = ""
    return { timestamp, images, description }
  })
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
