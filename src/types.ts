export type Picture = {
  name: string
  path: string
  tags: string[]
  timestamp: Date
}
export type SelectionType = "selected" | "maybe" | "no"

export const selectionTypeToTag = (type: SelectionType) => {
  switch (type) {
    case "maybe":
      return "Yellow"
    case "selected":
      return "Green"
    case "no":
      return undefined
  }
}

export const tagToSelectionType = (tag: string): SelectionType => {
  switch (tag) {
    case "Yellow":
      return "maybe"
    case "Green":
      return "selected"
    default:
      return "no"
  }
}
