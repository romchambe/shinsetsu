import React from "react"
import { SESSION_STATUS } from "../controllers/Session"

export const SessionContext = React.createContext({
  active: false,
  status: SESSION_STATUS.LOADING,
  timer: 0,
  duration: 180000,
  contentsLoaded: false,
  contentsCallback: () => console.log(""),
})
