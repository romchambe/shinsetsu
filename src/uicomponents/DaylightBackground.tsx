import React from 'react'

interface Props  {
  timeToEnd: number
  duration: number
}

export const DaylightBackground: React.FunctionComponent<Props> = (props)=> {
  return (
    <div className="flex h-full w-full bg-gradient-to-l from-yellow-gradient to-white">
      {props.children}
    </div>
  )
}