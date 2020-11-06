import React, { useContext } from "react"
import { animated, useSpring } from "react-spring"
import square from "../assets/images/shinsetsu-square.png"
import brand from "../assets/images/shinsetsu-text.png"
import { SessionContext } from "../contexts/SessionContext"
import { Timer } from "./Timer"

export const Header: React.FunctionComponent<{}> = () => {
  const { timer } = useContext(SessionContext)

  const [anim, setAnim] = useSpring(() => ({
    value: 0,
  }))

  console.log("ANIM VAL", anim.value.getValue())

  const translateY = anim.value.interpolate(
    (progress) => `translate(0px, -${progress * 100}px)`
  )

  const opacity = anim.value.interpolate((progress) => 1 - progress)

  const translateLogo = anim.value.interpolate(
    (progress) => `translate(-${progress * 80}px, ${progress * 100}px)`
  )
  return (
    <animated.div
      className="flex flex-col w-full pt-6 pb-8 items-center bg-green-400"
      style={{ transform: translateY }}
    >
      <animated.img
        src={square}
        alt="shinsetsu logo"
        style={{ width: 48, transform: translateLogo }}
      />
      <animated.img
        alt="shinsetsu"
        src={brand}
        style={{ width: 100, opacity }}
        className="mt-3"
      />
      <div className="mt-6" onClick={() => setAnim({ value: 1 })}>
        <Timer value={timer} />
      </div>
    </animated.div>
  )
}
