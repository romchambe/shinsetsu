import React, { Component } from "react"
import { SessionContext } from "../contexts/SessionContext"

interface SessionState {
  active: boolean
  timer: number
  duration: number
}

export class Session extends Component<{}, SessionState> {
  timer: null | NodeJS.Timeout = null
  constructor(props: {}) {
    super(props)
    this.state = { active: true, timer: 0, duration: 30000 }
  }

  componentDidMount(): void {
    window.addEventListener("load", this.startTimer)
    window.addEventListener("focus", this.onFocus)
  }

  startTimer: () => void = () => {
    this.timer = setInterval(this.updateTime, 1000)
  }

  stopTimer: () => void = () => {
    if (!!this.timer) {
      clearInterval(this.timer)
    }
  }

  updateTime: () => void = () => {
    this.setState((prevState) => {
      if (prevState.timer + 1000 > prevState.duration) {
        this.stopTimer()
        return { active: false, timer: 0 }
      }

      return { active: true, timer: prevState.timer + 1000 }
    })
  }

  onFocus: () => void = () => {
    if (!this.timer) {
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
