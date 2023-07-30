export type Picture = {
  name: string
  path: string
  tags: string[]
  timestamp: Date
}
export type SelectionType = "selected" | "maybe" | "rejected"

export const selectionTypeToTag = (type: SelectionType) => {
  switch (type) {
    case "maybe":
      return "Yellow"
    case "selected":
      return "Green"
    case "rejected":
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
      return "rejected"
  }
}
