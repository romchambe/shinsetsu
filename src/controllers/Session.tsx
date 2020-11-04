import React, { Component } from "react"
import { SessionContext } from "../contexts/SessionContext"
import { getVisibilityEvent } from "../utils/visibilityChange"

interface SessionState {
  active: boolean
  timer: number
  duration: number
}

export class Session extends Component<{}, SessionState> {
  timer: null | NodeJS.Timeout = null

  constructor(props: {}) {
    super(props)
    this.state = { active: false, timer: 0, duration: 60000 }
  }

  componentDidMount(): void {
    this.startTimer()
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

  updateTime: () => void = () => {
    this.setState((prevState) => {
      if (prevState.timer + 1000 > prevState.duration) {
        this.stopTimer()
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
        {this.props.children}
      </SessionContext.Provider>
    )
  }
}
