import React, { useContext } from "react"
import { SessionContext } from "../contexts/SessionContext"
import { DaylightBackground } from "../uicomponents/DaylightBackground"
import { Header } from "../uicomponents/Header"
import { Timer } from "../uicomponents/Timer"

export const PublicPage: React.FunctionComponent = () => {
  const session = useContext(SessionContext)

  return (
    <DaylightBackground
      timeToEnd={session.duration - session.timer}
      duration={session.duration}
    >
      <Header />
      <div className="flex w-full justify-center">
        <Timer value={session.timer} />
      </div>
    </DaylightBackground>
  )
}
