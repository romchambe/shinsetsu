import { Component } from "react"
import miniget from "miniget"
import { SessionContext } from "../contexts/SessionContext"
import {
  InstaImage,
  parseHtml,
  extractPostsData,
} from "../utils/fetchHashtag"

interface Props {
  hashtag: string
  main?: boolean
  render: (props: State) => JSX.Element
}

interface State {
  contentsLoaded: boolean
  posts: Post[]
}

export interface PostsList {
  posts: Post[]
}
export interface Post {
  images: InstaImage
  timestamp: number
  description: string
  id: string
}

export class InstaFetcher extends Component<Props, State> {
  static contextType = SessionContext

  constructor(props: Props) {
    super(props)
    this.state = {
      posts: [],
      contentsLoaded: false,
    }
  }

  async componentDidMount(): Promise<void> {
    console.log(this.context)
    const instaHtml = await miniget(
      `https://instagram.com/explore/tags/${this.props.hashtag}/`
    ).text()

    const data = parseHtml(instaHtml)
    const posts = extractPostsData(data)

    this.setState({ posts, contentsLoaded: true })
    this.context.contentsCallback()
  }

  render(): JSX.Element {
    return this.props.render(this.state)
  }
}
