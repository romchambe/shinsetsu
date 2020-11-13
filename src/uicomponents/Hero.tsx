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
      className="lg:absolute lg:max-w-xs lg:left-0 lg:text-left lg:ml-8 lg:z-10 lg:mb-0 lg:p-0 lg:block lg:bg-transparent p-3 flex flex-col items-center bg-white rounded-sm mb-8 text-center"
      style={window.innerWidth > 1024 ? { top, opacity } : {}}
    >
      <div className="text-black font-yogasanspro font-bold flex-wrap text-xl">
        shinsetsu présente les derniers posts sur le hashtag chamonix
      </div>
      <div className="text-text-lt flex-wrap mt-6">
        shinsetsu signifie la neige fraîche en japonais
      </div>
      <div className="text-text-lt flex-wrap ">
        c&apos;est un projet de démo en react et typescript
      </div>
    </animated.div>
  )
}
