import React, { Component } from "react"
import { SessionContext } from "../contexts/SessionContext"
import { Header } from "../uicomponents/Header"
import { getVisibilityEvent } from "../utils/visibilityChange"

interface SessionState {
  active: boolean
  timer: number
  duration: number
  startTimer: () => void
  sessionRestart: number | null
}

export class Session extends Component<{}, SessionState> {
  timer: null | NodeJS.Timeout = null

  constructor(props: {}) {
    super(props)
    this.state = {
      active: true,
      timer: 0,
      duration: 30000,
      startTimer: this.startTimer,
      sessionRestart: null,
    }
  }

  componentDidMount(): void {
    const { visibilityChange } = getVisibilityEvent()

    if (
      !!visibilityChange &&
      typeof document.addEventListener !== "undefined"
    ) {
      document.addEventListener(visibilityChange, this.onVisibilityChange)
    }
  }

  startTimer: () => void = () => {
    this.timer = setInterval(this.updateTime, 1000)
  }

  stopTimer: () => void = () => {
    if (!!this.timer) {
      clearInterval(this.timer)
    }
    this.timer = null
  }

  endSession: () => void = () => {
    const sessionRestart = Date.now() + 20 * 60000

    window.localStorage.setItem(
      "sessionRestart",
      sessionRestart.toString()
    )

    this.setState({ sessionRestart, active: false })
  }

  updateTime: () => void = () => {
    this.setState((prevState) => {
      if (prevState.timer + 1000 > prevState.duration) {
        this.stopTimer()
        this.endSession()
        return { active: false, timer: prevState.timer }
      }

      return { active: true, timer: prevState.timer + 1000 }
    })
  }

  onVisibilityChange: (event: Event) => void = (event) => {
    console.log("EVENT", event)
    if (document.visibilityState === "hidden" && this.timer) {
      this.stopTimer()
    }
    if (document.visibilityState === "visible" && !this.timer) {
      this.startTimer()
    }
  }

  render(): JSX.Element {
    return (
      <SessionContext.Provider value={this.state}>
        {this.state.active ? (
          this.props.children
        ) : (
          <div className="flex flex-col items-center w-full">
            <Header contentScrolled={false} contentsLoaded={false} />
            <div className="mt-6">
              dans quelques minutes, la neige fraiche aura fondu,
              patience... ;)
            </div>
          </div>
        )}
      </SessionContext.Provider>
    )
  }
}
