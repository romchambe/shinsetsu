import React, { useContext } from "react"
import { useSpring, animated } from "react-spring"
import { ScrollContext } from "../contexts/ScrollContext"

export const Hero = (props: { contentsLoaded: boolean }): JSX.Element => {
  const { scrolling } = useContext(ScrollContext)
  const { top } = useSpring({
    top: scrolling ? 250 : 354,
  })

  const { opacity } = useSpring({
    opacity: props.contentsLoaded ? 1 : 0,
  })
  console.log("TOP", top.getValue(), scrolling)
  return (
    <animated.div
      className="absolute max-w-xs text-center lg:text-left left-0 ml-8  z-10"
      style={{ top, opacity }}
    >
      <div
        className="text-black font-yogasanspro font-bold flex-wrap text-xl"
        style={{ letterSpacing: "-0.1px" }}
      >
        shinsetsu présente les derniers posts sur le hashtag chamonix
      </div>
      <div className="text-text-lt flex-wrap mt-6">
        shinsetsu signifie la neige fraîche en japonais
      </div>
      <div className="text-text-lt flex-wrap mt-1">
        c&apos;est un projet de démo en react et typescript
      </div>
    </animated.div>
  )
}
