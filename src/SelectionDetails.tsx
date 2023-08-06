import React, { FC, ReactNode } from "react"
import { SelectionType } from "./types"

const CountCard = ({
  count,
  title,
  background,
}: {
  title: string
  count: number
  background: string
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      padding: "5px",
      backgroundColor: background,
      color: "#1e1e2e",
      borderRadius: "5px",
    }}
  >
    <div
      style={{
        fontSize: "13px",
      }}
    >
      {title}
    </div>
    <div>
      <b>{count}</b>
    </div>
  </div>
)

const Button: FC<{
  backgroundColor: string
  gridArea: string
  isSelected?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children?: ReactNode
}> = ({ backgroundColor, gridArea, isSelected, onClick, children }) => (
  <button
    style={{
      backgroundColor,
      fontSize: "13px",
      boxSizing: "border-box",
      boxShadow: "none",
      borderRadius: "5px",
      border: isSelected ? "2px solid #fff" : "none",
      padding: "10px",
      cursor: "pointer",
      gridArea,
    }}
    onClick={onClick}
  >
    {children}
  </button>
)

export const SelectionDetails: FC<{
  selectedCount: number
  maybeCount: number
  rejectedCount: number
  totalCount: number
  selectionFilter: SelectionType | undefined
  setSelectionFilter: (s: SelectionType | undefined) => void
}> = ({
  selectedCount,
  rejectedCount,
  maybeCount,
  totalCount,
  selectionFilter,
  setSelectionFilter,
}) => (
  <div>
    <div
      style={{
        display: "grid",
        gap: "5px",
        gridTemplateAreas: `
          "h h h h"
          "b c d e"
        `,
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          gridArea: "h",
        }}
      >
        Filter pictures
      </div>
      <Button
        gridArea="b"
        backgroundColor="#89b4fa"
        isSelected={selectionFilter === undefined}
        onClick={() => setSelectionFilter(undefined)}
      >
        All
      </Button>
      <Button
        gridArea="c"
        backgroundColor="#a6e3a1"
        isSelected={selectionFilter === "selected"}
        onClick={() => setSelectionFilter("selected")}
      >
        Selected
      </Button>
      <Button
        gridArea="d"
        backgroundColor="#f9e2af"
        isSelected={selectionFilter === "maybe"}
        onClick={() => setSelectionFilter("maybe")}
      >
        Maybe
      </Button>
      <Button
        gridArea="e"
        backgroundColor="#f38ba8"
        isSelected={selectionFilter === "rejected"}
        onClick={() => setSelectionFilter("rejected")}
      >
        Rejected
      </Button>
    </div>
    <div
      style={{
        display: "grid",
        gridTemplate: `
          "1fr 1fr"
          "1fr 1fr"
        `,
        gap: "5px",
      }}
    >
      <CountCard count={selectedCount} title="Selected" background="#a6e3a1" />
      <CountCard count={maybeCount} title="Maybe" background="#f9e2af" />
      <CountCard count={rejectedCount} title="Rejected" background="#f38ba8" />
      <CountCard count={totalCount} title="Total" background="#89b4fa" />
    </div>
  </div>
)
