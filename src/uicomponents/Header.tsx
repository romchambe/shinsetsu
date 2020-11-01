import React from "react"
import shinsetsu from "../assets/images/shinsetsu.png"

export const Header: React.FunctionComponent<{}> = () => {
  return (
    <div className="flex w-full p-6 justify-center">
      <img src={shinsetsu} alt="shinsetsu" style={{ height: 80 }} />
    </div>
  )
}
