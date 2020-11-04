export function getVisibilityEvent(): {
  hidden: string | null
  visibilityChange: string | null
} {
  let hidden = null,
    visibilityChange = null
  const doc = document as Document & {
    msHidden: unknown
    webkitHidden: unknown
  }
  if (typeof doc.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden"
    visibilityChange = "visibilitychange"
  } else if (typeof doc.msHidden !== "undefined") {
    hidden = "msHidden"
    visibilityChange = "msvisibilitychange"
  } else if (typeof doc.webkitHidden !== "undefined") {
    hidden = "webkitHidden"
    visibilityChange = "webkitvisibilitychange"
  }

  return { hidden, visibilityChange }
}
