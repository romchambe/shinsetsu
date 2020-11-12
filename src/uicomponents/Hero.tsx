import React from "react"

export const Hero = (): JSX.Element => {
  return (
    <div className="max-w-xs md:sticky left-0 ml-8 bg-blue-300 z-10">
      <div
        className="text-black font-yogasanspro font-bold flex-wrap text-xl"
        style={{ letterSpacing: "-0.1px" }}
      >
        shinsetsu présente les derniers posts sur le hashtag chamonix
      </div>
      <div className="text-text-lt flex-wrap mt-6">
        shinsetsu signifie la neige fraîche en japonais démo front en
        react, typescript
      </div>
    </div>
  )
}
