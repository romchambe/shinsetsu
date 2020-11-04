import React, { useContext } from "react"
import { useSpring, animated } from "react-spring"
import { SessionContext } from "../contexts/SessionContext"

const entryThreshold = 0.2,
  exitThreshold = 0.8

export const DaylightBackground: React.FunctionComponent<{
  contentsLoaded: boolean
}> = (props) => {
  const { active, timer, duration } = useContext(SessionContext)

  const [{ progress }, setProgress] = useSpring(() => ({
    progress: 0,
    config: { duration: 1000 },
  }))

  setProgress({ progress: timer / duration })

  const backgroundColor = progress.interpolate({
    range: [0, entryThreshold, exitThreshold, 1],
    output: ["#ff9696", "#ffdaa7", "#ffdaa7", "#b09afe"],
  })

  const gradientColor = progress.interpolate({
    range: [0, entryThreshold, exitThreshold, 1],
    output: ["#ffe6e6", "#fff6ea", "#fff6ea", "#efebfa"],
  })

  const transform = progress.interpolate(
    (prog) =>
      `translate(-${prog * (window.innerWidth + 64)}px,${
        Math.pow(2 * prog - 1, 2) * 0.3 * window.innerHeight
      }px)`
  )

  const gradient = {
    background: `linear-gradient(${
      270 - 180 * progress.getValue()
    }deg, ${gradientColor.getValue()}, transparent)`,
  }

  return props.contentsLoaded ? (
    <div
      className="flex min-h-full w-full flex-col overflow-hidden"
      style={gradient}
    >
      {active ? (
        <animated.div
          className={`absolute rounded-2xl w-8 h-8`}
          style={{
            right: -32,
            top: 32,
            transform,
            backgroundColor,
          }}
        ></animated.div>
      ) : null}

      {props.children}
    </div>
  ) : (
    <React.Fragment>{props.children}</React.Fragment>
  )
}
