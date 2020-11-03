import React from "react"

export const SessionContext = React.createContext({
  active: true,
  timer: 0,
  duration: 180000,
})
