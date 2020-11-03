import React, { useContext } from "react"
import { useSpring, animated } from "react-spring"
import { SessionContext } from "../contexts/SessionContext"

export const DaylightBackground: React.FunctionComponent<{}> = (props) => {
  const { active, timer, duration } = useContext(SessionContext)

  const [{ progress }, setProgress] = useSpring(() => ({
    progress: 0,
    config: { duration: 1000 },
  }))

  setProgress({ progress: timer / duration })

  const color = useSpring({
    from: { backgroundColor: "#ff9696" },
    to: { backgroundColor: "#ffdaa7" },
    config: { duration: 0.125 * duration },
  })

  console.log(color)

  const transform = progress.interpolate(
    (prog) =>
      `translate(-${prog * (window.innerWidth + 64)}px,${
        Math.pow(2 * prog - 1, 2) * 0.3 * window.innerHeight
      }px)`
  )

  const gradient = {
    background: `linear-gradient(${
      270 - 180 * progress.getValue()
    }deg, ${getGradientColor(progress.getValue())}, transparent)`,
  }

  //rgb(255,246,234)
  //rgb(255,230,230)

  return (
    <div className="h-full w-full" style={gradient}>
      {active ? (
        <animated.div
          className={`absolute rounded-2xl w-8 h-8`}
          style={{
            right: -32,
            top: 24,
            transform,
            ...color,
          }}
        ></animated.div>
      ) : null}

      {props.children}
    </div>
  )
}

function getGradientColor(progress: number) {
  const entryThreshold = 0.125,
    exitThreshold = 0.875
  let red = 255,
    green = 246,
    blue = 234
  let advance

  if (progress <= entryThreshold) {
    advance = progress / entryThreshold
    const transform = {
      red: [255, 255],
      green: [230, 246],
      blue: [230, 234],
    }

    red = Math.round(
      transform.red[0] + advance * (transform.red[1] - transform.red[0])
    )
    green = Math.round(
      transform.green[0] +
        advance * (transform.green[1] - transform.green[0])
    )
    blue = Math.round(
      transform.blue[0] + advance * (transform.blue[1] - transform.blue[0])
    )
  }
  if (progress >= exitThreshold) {
    advance = progress - entryThreshold / (1 - entryThreshold)

    const transform = {
      red: [255, 239],
      green: [246, 235],
      blue: [234, 250],
    }

    red = Math.round(
      transform.red[0] + advance * (transform.red[1] - transform.red[0])
    )
    green = Math.round(
      transform.green[0] +
        advance * (transform.green[1] - transform.green[0])
    )
    blue = Math.round(
      transform.blue[0] + advance * (transform.blue[1] - transform.blue[0])
    )
  }

  return `rgb(${red},${green},${blue})`
}
