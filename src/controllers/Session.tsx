import React, { Component } from "react"
import { SessionContext } from "../contexts/SessionContext"
import { Header } from "../uicomponents/Header"
import { getVisibilityEvent } from "../utils/visibilityChange"

interface SessionState {
  active: boolean
  timer: number
  duration: number
  startSession: () => void
  nextSessionTime: number | null
}

const SESSION_DURATION = 180000
const BREAK_DURATION = 1 * 60000
export class Session extends Component<{}, SessionState> {
  timer: null | NodeJS.Timeout = null

  constructor(props: {}) {
    super(props)
    this.state = {
      active: false,
      timer: 0,
      duration: SESSION_DURATION,
      startSession: this.startSession,
      nextSessionTime: null,
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

    const storedNextSession = window.localStorage.getItem(
      "nextSessionTime"
    )

    const storedCurrentSession = window.localStorage.getItem(
      "currentSessionTime"
    )

    this.handleSessionState(storedNextSession, storedCurrentSession)
  }

  startSession: () => void = () => {
    const currentTime = Date.now()
    const storedCurrentSession = window.localStorage.getItem(
      "currentSessionTime"
    )

    if (!!storedCurrentSession) {
      const currentSessionTime = Number.parseInt(storedCurrentSession)

      if (
        currentTime >=
        currentSessionTime + SESSION_DURATION + BREAK_DURATION
      ) {
        this.startTimer()
        window.localStorage.setItem(
          "currentSessionTime",
          currentTime.toString()
        )
      }

      if (currentTime <= currentSessionTime + SESSION_DURATION) {
        this.startTimer()
      }
    } else {
      this.startTimer()
      window.localStorage.setItem(
        "currentSessionTime",
        currentTime.toString()
      )
    }
  }

  endSession: () => void = () => {
    this.stopTimer()
    const nextSessionTime = Date.now() + BREAK_DURATION

    window.localStorage.setItem(
      "nextSessionTime",
      nextSessionTime.toString()
    )

    this.setState({ nextSessionTime, active: false })
  }

  handleSessionState = (
    storedNextSession: string | null,
    storedCurrentSession: string | null
  ): void => {
    const nextState: Partial<SessionState> = {
      active: true,
    }
    const currentTime = Date.now()
    console.log(
      "NEXT SESSION",
      storedNextSession,
      !!storedNextSession
        ? new Date(Number.parseInt(storedNextSession))
        : null
    )

    console.log(
      "CURRENT SESSION",
      storedCurrentSession,
      !!storedCurrentSession
        ? new Date(Number.parseInt(storedCurrentSession))
        : null
    )

    if (!!storedNextSession) {
      const nextSessionTime = Number.parseInt(storedNextSession)
      if (currentTime < nextSessionTime) {
        nextState.active = false
        nextState.nextSessionTime = nextSessionTime
      }

      if (!!storedCurrentSession) {
        const currentSessionTime = Number.parseInt(storedCurrentSession)

        if (
          currentTime >= nextSessionTime &&
          currentTime <=
            currentSessionTime + SESSION_DURATION + BREAK_DURATION
        ) {
          nextState.active = false
          nextState.nextSessionTime =
            currentSessionTime + SESSION_DURATION + BREAK_DURATION
        }
      }
    }

    if (!!storedCurrentSession) {
      const currentSessionTime = Number.parseInt(storedCurrentSession)

      if (currentTime < currentSessionTime + SESSION_DURATION) {
        nextState.timer =
          Math.round((currentTime - currentSessionTime) / 1000) * 1000
      }
    }

    this.setState((prevState) => ({ ...prevState, ...nextState }))
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
              un peu de patience pendant que la neige fraîche
              s&apos;accumule
            </div>
          </div>
        )}
      </SessionContext.Provider>
    )
  }
}
