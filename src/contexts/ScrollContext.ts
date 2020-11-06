import React from "react"

export const ScrollContext = React.createContext({
  scrolling: false,
  shouldReload: false,
  deactivateReload: () => {
    console.log("")
  },
})
