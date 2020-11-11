import React, { Component } from "react"

import { SessionContext } from "../contexts/SessionContext"
import { Header } from "../uicomponents/Header"
import { getVisibilityEvent } from "../utils/visibilityChange"

interface SessionState {
  active: boolean
  timer: number
  status: SESSION_STATUS
  duration: number
  nextSessionTime: number | null
  startSessionTime: number | null
  contentsLoaded: boolean
  contentsCallback: () => void
}

const SESSION_DURATION = 180000
const BREAK_DURATION = 1 * 60000

export enum SESSION_STATUS {
  ONGOING,
  PAUSED,
  WAITING_NEXT,
  LOADING,
}

export enum LOCAL_STORAGE_KEYS {
  SESSION_STATE = "sessionState",
}

export class Session extends Component<{}, SessionState> {
  timer: null | NodeJS.Timeout = null

  constructor(props: {}) {
    super(props)
    this.state = {
      active: false,
      status: SESSION_STATUS.LOADING,
      timer: 0,
      duration: SESSION_DURATION,
      nextSessionTime: null,
      startSessionTime: null,
      contentsLoaded: false,
      contentsCallback: () => this.setState({ contentsLoaded: true }),
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

    const storedState = getStoredSessionState()
    console.log(storedState)

    if (storedState) {
      if (
        storedState.active === undefined ||
        storedState.active === null
      ) {
        const nextState = {
          active: true,
          status: SESSION_STATUS.ONGOING,
        }

        storeState(nextState)
        this.setState(nextState)
      }

      switch (storedState.status) {
      }
    }

    if (!storedState) {
      const nextState = { active: true, status: SESSION_STATUS.ONGOING }

      storeState(nextState)
      this.setState(nextState)
    }
  }

  startSession: () => void = () => {
    const startSessionTime = Date.now()

    this.setState({
      startSessionTime,
      active: true,
      status: SESSION_STATUS.ONGOING,
    })

    storeState({
      startSessionTime,
      active: true,
      status: SESSION_STATUS.ONGOING,
    })
  }

  endSession: () => void = () => {
    this.stopTimer()
    const nextSessionTime = Date.now() + BREAK_DURATION

    this.setState({
      nextSessionTime,
      active: false,
      status: SESSION_STATUS.WAITING_NEXT,
    })

    storeState({
      nextSessionTime,
      active: false,
      status: SESSION_STATUS.WAITING_NEXT,
    })
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
        storeState({ active: false, timer: 0 })
        return { active: false, timer: 0 }
      }

      storeState({ active: true, timer: prevState.timer + 1000 })
      return { active: true, timer: prevState.timer + 1000 }
    })
  }

  onVisibilityChange: (event: Event) => void = (event) => {
    console.log("EVENT", event)

    if (document.visibilityState === "hidden" && this.timer) {
      this.stopTimer()
      this.setState({ status: SESSION_STATUS.PAUSED })
      storeState({ status: SESSION_STATUS.PAUSED })
    }

    if (document.visibilityState === "visible" && !this.timer) {
      this.startTimer()
      this.setState({ status: SESSION_STATUS.ONGOING })
      storeState({ status: SESSION_STATUS.ONGOING })
    }
  }

  render(): JSX.Element {
    if (this.state.contentsLoaded && !this.timer) {
      this.startTimer()
    }

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

function getStoredSessionState(): SessionState | null {
  const storedState = window.localStorage.getItem(
    LOCAL_STORAGE_KEYS.SESSION_STATE
  )

  if (!!storedState) {
    return JSON.parse(storedState) as SessionState
  }

  return null
}

function storeState(state: Partial<SessionState>) {
  const prevState = getStoredSessionState()
  const nextState = !!prevState ? { ...prevState, ...state } : state

  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.SESSION_STATE,
    JSON.stringify(nextState)
  )
}
