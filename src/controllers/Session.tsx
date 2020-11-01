import React, { Component } from "react"
import { DaylightBackground } from "../uicomponents/DaylightBackground"

interface SessionState {
  active: boolean
  timer: number
  duration: number
}

export class Session extends Component<{}, SessionState> {
  timer: null | NodeJS.Timeout = null
  constructor(props: {}) {
    super(props)
    this.state = { active: true, timer: 0, duration: 180000 }
  }

  componentDidMount(): void {
    window.addEventListener("load", this.startTimer)
    window.addEventListener("focus", this.onFocus)
  }

  startTimer: () => void = () => {
    this.timer = setInterval(
      () =>
        this.setState((prevState) => {
          console.log("next timer", prevState.timer + 1000)
          return { timer: prevState.timer + 1000 }
        }),
      1000
    )
  }

  stopTimer: () => void = () => {
    if (!!this.timer) {
      clearInterval(this.timer)
    }
  }

  onFocus: () => void = () => {
    if (!this.timer) {
      this.startTimer()
    }
  }

  render(): JSX.Element {
    return (
      <DaylightBackground
        duration={this.state.duration}
        timeToEnd={this.state.duration - this.state.timer}
      >
        {this.props.children}
      </DaylightBackground>
    )
  }
}
