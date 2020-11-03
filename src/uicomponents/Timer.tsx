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
    <div className="rounded-lg shadow bg-white w-48">
      <div className="text-4xl text-center leading-none py-3 font-bold text-funky-text">
        {time}
      </div>
    </div>
  )
}
