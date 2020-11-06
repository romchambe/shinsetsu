import React, { Component } from "react"
import { Spring } from "react-spring/renderprops"

interface Props {
  setContentScrolled: React.Dispatch<React.SetStateAction<boolean>>
}

export class ScrollController extends Component<
  Props,
  { scrolling: boolean }
> {
  constructor(props: Props) {
    super(props)
    this.state = { scrolling: false }
  }

  handleScroll: (e: React.UIEvent<HTMLElement>) => void = (e) => {
    // console.log("Scroll", e.currentTarget.scrollTop)

    if (e.currentTarget.scrollTop > 16) {
      this.setState((prevState) => {
        if (prevState.scrolling) {
          return null
        } else {
          this.props.setContentScrolled(true)
          return { scrolling: true }
        }
      })
    }

    if (e.currentTarget.scrollTop <= 16) {
      this.setState((prevState) => {
        if (prevState.scrolling) {
          this.props.setContentScrolled(false)
          return { scrolling: false }
        } else {
          return null
        }
      })
    }
  }

  render(): JSX.Element {
    return (
      <Spring
        from={{ transform: "translate(0px, 0px)" }}
        to={{
          transform: `translate(0px, ${
            this.state.scrolling ? -104 : 0
          }px)`,
        }}
      >
        {(props) => (
          <div
            className="flex flex-col items-center overflow-y-auto"
            onScroll={this.handleScroll}
            style={{ ...props, ...{ marginBottom: -104 } }}
          >
            {this.props.children}
          </div>
        )}
      </Spring>
    )
  }
}
