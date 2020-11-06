import React from "react"

export const Timer: React.FunctionComponent<{ value: number }> = (
  props
) => {
  const time = `${
    Math.floor(props.value / 60000) < 10 ? "0" : ""
  }${Math.floor(props.value / 60000)}:${
    Math.floor((props.value % 60000) / 1000) < 10 ? "0" : ""
  }${Math.floor((props.value % 60000) / 1000)}`

  return (
    <div className="rounded-lg bg-white w-40">
      <div className="text-3xl text-center leading-none py-2 font-bold text-funky-text">
        {time}
      </div>
    </div>
  )
}
