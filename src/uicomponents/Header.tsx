import React, { useContext } from "react"
import { animated, useSpring } from "react-spring"
import square from "../assets/images/shinsetsu-square.png"
import brand from "../assets/images/shinsetsu-text.png"
import { SessionContext } from "../contexts/SessionContext"
import { Timer } from "./Timer"

interface Props {
  contentScrolled: boolean
}

export const Header: React.FunctionComponent<Props> = (props) => {
  const { timer } = useContext(SessionContext)

  const [anim, setAnim] = useSpring(() => ({
    value: 0,
  }))

  const translateY = anim.value.interpolate(
    (progress) => `translate(0px, -${progress * 104}px)`
  )

  const opacity = anim.value.interpolate((progress) => 1 - progress)

  const translateLogo = anim.value.interpolate(
    (progress) => `translate(-${progress * 86}px, ${progress * 104}px)`
  )

  const translateTimer = anim.value.interpolate(
    (progress) => `translate(${progress * 30}px, 0px)`
  )

  if (props.contentScrolled) {
    setAnim({ value: 1 })
  }
  if (!props.contentScrolled) {
    setAnim({ value: 0 })
  }
  return (
    <animated.div
      className="flex flex-col w-full py-6 items-center"
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
        style={{ height: 20, opacity }}
        className="mt-3"
      />
      <animated.div className="mt-6" style={{ transform: translateTimer }}>
        <Timer value={timer} />
      </animated.div>
    </animated.div>
  )
}
