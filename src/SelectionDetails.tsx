import { FC } from "react"

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

export const SelectionDetails: FC<{
  selectedCount: number
  maybeCount: number
  rejectedCount: number
  totalCount: number
}> = ({ selectedCount, rejectedCount, maybeCount, totalCount }) => (
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
)
