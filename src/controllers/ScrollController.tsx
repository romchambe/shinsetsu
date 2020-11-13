import React, { Component } from "react"
import { Spring } from "react-spring/renderprops"
import { ScrollContext } from "../contexts/ScrollContext"
import Loader from "react-loader-spinner"
import { Hero } from "../uicomponents/Hero"
interface Props {
  setContentScrolled: React.Dispatch<React.SetStateAction<boolean>>
  contentsLoaded: boolean
}

interface State {
  scrolling: boolean
  shouldReload: boolean
  reloadAnim: boolean
  deactivateReload: () => void
}

export class ScrollController extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      scrolling: false,
      shouldReload: false,
      reloadAnim: false,
      deactivateReload: () => this.setState({ shouldReload: false }),
    }
  }

  scrollContainer: HTMLDivElement | null = null
  reloadAnim: NodeJS.Timeout | null = null

  handleScroll: (e: React.UIEvent<HTMLElement>) => void = (e) => {
    const scrollMax = this.scrollContainer
      ? this.scrollContainer.scrollHeight -
        this.scrollContainer.clientHeight
      : null

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
    if (!!scrollMax && e.currentTarget.scrollTop >= scrollMax - 16) {
      this.setState((prevState) => {
        if (prevState.reloadAnim) {
          return null
        } else {
          return { reloadAnim: true }
        }
      })

      if (!this.reloadAnim) {
        this.reloadAnim = setTimeout(() => {
          this.setState((prevState) => {
            if (prevState.shouldReload) {
              return null
            } else {
              return { shouldReload: true, reloadAnim: false }
            }
          })

          if (this.reloadAnim) {
            clearTimeout(this.reloadAnim)
          }
        }, 800)
      }
    }
  }

  render(): JSX.Element {
    return (
      <ScrollContext.Provider value={this.state}>
        <div className="hidden lg:block">
          <Hero contentsLoaded={this.props.contentsLoaded} />
        </div>

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
              className="flex flex-col items-center overflow-y-auto pb-12"
              onScroll={this.handleScroll}
              ref={(scrollContainer) =>
                (this.scrollContainer = scrollContainer)
              }
              style={{ ...props, ...{ marginBottom: -104 } }}
            >
              {this.props.children}
              {this.state.reloadAnim ? (
                <div className="mt-6">
                  <Loader
                    type="Audio"
                    color="#9a82e6"
                    height={32}
                    width={32}
                    timeout={5000} //3 secs
                  />
                </div>
              ) : null}
            </div>
          )}
        </Spring>
      </ScrollContext.Provider>
    )
  }
}
