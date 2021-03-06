import React, { Component } from "react"

import { SessionContext } from "../contexts/SessionContext"
import { Header } from "../uicomponents/Header"
import { Timer } from "../uicomponents/Timer"
import { getVisibilityEvent } from "../utils/visibilityChange"

interface SessionState {
  active: boolean
  timer: number
  nextTimer: number
  status: SESSION_STATUS
  duration: number
  nextSessionTime: number | null
  startSessionTime: number | null
  contentsLoaded: boolean
  contentsCallback: () => void
}

const SESSION_DURATION = 300000
const BREAK_DURATION = 10 * 60000

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
  nextTimer: null | NodeJS.Timeout = null

  constructor(props: {}) {
    super(props)
    this.state = {
      active: false,
      status: SESSION_STATUS.LOADING,
      timer: 0,
      nextTimer: 0,
      duration: SESSION_DURATION,
      nextSessionTime: null,
      startSessionTime: null,
      contentsLoaded: false,
      contentsCallback: () =>
        this.setState({
          contentsLoaded: true,
          status: SESSION_STATUS.ONGOING,
        }),
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
    console.log("STORED", storedState)

    if (storedState) {
      if (
        storedState.active === undefined ||
        storedState.active === null
      ) {
        this.persistState({
          startSessionTime: Date.now(),
          nextSessionTime: null,
          active: true,
          status: SESSION_STATUS.LOADING,
        })
      }

      switch (storedState.status) {
        case SESSION_STATUS.PAUSED:
        case SESSION_STATUS.ONGOING:
        case SESSION_STATUS.LOADING:
          this.persistState({
            startSessionTime: Date.now() - storedState.timer,
            nextSessionTime: null,
            timer: storedState.timer,
            active: true,
            status: SESSION_STATUS.LOADING,
          })
          break

        case SESSION_STATUS.WAITING_NEXT:
          if (
            !storedState.nextSessionTime ||
            (storedState.nextSessionTime &&
              Date.now() > storedState.nextSessionTime)
          ) {
            this.persistState({
              startSessionTime: Date.now(),
              nextSessionTime: null,
              timer: 0,
              active: true,
              status: SESSION_STATUS.LOADING,
            })
          } else {
            this.persistState(storedState)
          }

          break
      }
    }

    if (!storedState) {
      this.persistState({ active: true, status: SESSION_STATUS.ONGOING })
    }
  }

  persistState = (nextState: Partial<SessionState>): void => {
    storeState(nextState)
    this.setState((prevState) => ({ ...prevState, ...nextState }))
  }

  startSession: () => void = () => {
    this.stopNextTimer()
    const startSessionTime = Date.now()

    this.persistState({
      startSessionTime,
      active: true,
      status: SESSION_STATUS.ONGOING,
    })
  }

  endSession: () => void = () => {
    this.stopTimer()
    const nextSessionTime = Date.now() + BREAK_DURATION

    this.persistState({
      nextSessionTime,
      active: false,
      timer: 0,
      status: SESSION_STATUS.WAITING_NEXT,
    })
  }

  startTimer: () => void = () => {
    if (this.state.status !== SESSION_STATUS.WAITING_NEXT) {
      this.timer = setInterval(this.updateTime, 1000)
    }
  }

  stopTimer: () => void = () => {
    if (!!this.timer) {
      console.log("clear")
      clearInterval(this.timer)
    }
    this.timer = null
  }

  startNextTimer: () => void = () => {
    console.log("starting next 2")
    if (this.state.status === SESSION_STATUS.WAITING_NEXT) {
      console.log("starting next")
      this.nextTimer = setInterval(this.updateNextTime, 1000)
    }
  }

  stopNextTimer: () => void = () => {
    if (!!this.nextTimer) {
      console.log("clear")
      clearInterval(this.nextTimer)
    }
    this.nextTimer = null
  }

  updateTime: () => void = () => {
    console.log("TIMER", this.state.timer, this.timer)
    if (this.state.timer + 1000 >= SESSION_DURATION) {
      this.endSession()
    } else {
      this.persistState({ active: true, timer: this.state.timer + 1000 })
    }
  }

  updateNextTime: () => void = () => {
    console.log(
      "NEXT TIMER",
      this.state.nextTimer,
      this.state.nextSessionTime
        ? this.state.nextSessionTime - Date.now()
        : null
    )
    if (this.state.nextSessionTime) {
      if (Date.now() >= this.state.nextSessionTime) {
        this.startSession()
      } else {
        this.persistState({
          active: false,
          nextTimer: this.state.nextSessionTime - Date.now(),
        })
      }
    }
  }

  onVisibilityChange: (event: Event) => void = (event) => {
    if (
      document.visibilityState === "hidden" &&
      this.state.status === SESSION_STATUS.ONGOING
    ) {
      console.log("SHOULD PAUSE", event)
      if (this.timer) {
        this.stopTimer()
      }
      this.persistState({ status: SESSION_STATUS.PAUSED })
    }
    if (
      document.visibilityState === "visible" &&
      this.state.status !== SESSION_STATUS.WAITING_NEXT
    ) {
      console.log("SHOULD RESTART", event)
      if (!this.timer) {
        this.startTimer()
      }
      this.persistState({
        status: SESSION_STATUS.ONGOING,
        startSessionTime: Date.now() - this.state.timer,
      })
    }
  }

  componentWillUnmount(): void {
    const { visibilityChange } = getVisibilityEvent()

    if (
      !!visibilityChange &&
      typeof document.addEventListener !== "undefined"
    ) {
      document.removeEventListener(
        visibilityChange,
        this.onVisibilityChange
      )
    }

    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.nextTimer) {
      clearInterval(this.nextTimer)
    }
  }

  render(): JSX.Element {
    if (
      this.state.status === SESSION_STATUS.ONGOING &&
      this.state.contentsLoaded &&
      !this.timer
    ) {
      this.startTimer()
    }

    if (
      this.state.status === SESSION_STATUS.WAITING_NEXT &&
      !this.nextTimer
    ) {
      console.log("starting next 3")
      this.startNextTimer()
    }

    return (
      <SessionContext.Provider value={this.state}>
        {this.state.active ? (
          this.props.children
        ) : (
          <div
            className="flex-1 flex-col items-center justify-center"
            style={{
              background: `linear-gradient(90deg, #efebfa, transparent)`,
            }}
          >
            <Header contentScrolled={false} contentsLoaded={false} />
            <div className="flex flex-col items-center w-full">
              <div
                className="mt-6 mb-2 text-black max-w-xs md:max-w-md text-center"
                style={{ letterSpacing: "-0.3px" }}
              >
                une petite pause avant de continuer ;)
              </div>
              <div
                className="mb-6 text-text-lt max-w-xs md:max-w-md text-center"
                style={{ letterSpacing: "-0.3px" }}
              >
                il sera bientôt temps de contempler les montagnes à nouveau
              </div>
              <Timer value={this.state.nextTimer} />
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
