export type Picture = {
  name: string
  path: string
  tags: string[]
  timestamp: Date
}
export type SelectionType =
  | "selected-main"
  | "selected-memory"
  | "maybe"
  | "rejected"

export const selectionTypeToTag = (type: SelectionType) => {
  switch (type) {
    case "maybe":
      return "Yellow"
    case "selected-main":
      return "Green"
    case "selected-memory":
      return "Purple"
    case "rejected":
      return undefined
  }
}

export const tagToSelectionType = (tag: string): SelectionType => {
  switch (tag) {
    case "Yellow":
      return "maybe"
    case "Green":
      return "selected-main"
    case "Purple":
      return "selected-memory"
    default:
      return "rejected"
  }
}
