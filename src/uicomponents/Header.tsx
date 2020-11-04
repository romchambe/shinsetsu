import React, { useContext } from "react"
import shinsetsu from "../assets/images/shinsetsu.png"
import { SessionContext } from "../contexts/SessionContext"
import { Timer } from "./Timer"

export const Header: React.FunctionComponent<{}> = () => {
  const { timer } = useContext(SessionContext)
  return (
    <div className="flex flex-col w-full p-6 items-center">
      <img src={shinsetsu} alt="shinsetsu" style={{ width: 112 }} />
      <div className="mt-8">
        <Timer value={timer} />
      </div>
    </div>
  )
}
