import { Picture, tagToSelectionType } from "./types"

export const PictureDetails = ({ picture }: { picture: Picture }) => {
  const tagColor = (() => {
    const selectionType = tagToSelectionType(picture.tags[0])
    switch (selectionType) {
      case "selected-main":
        return "#a6e3a1"
      case "selected-memory":
        return "#cba6f7"
      case "maybe":
        return "#f9e2af"
      case "rejected":
        return "#f38ba8"
    }
  })()

  return (
    <div>
      <div
        style={{
          backgroundColor: tagColor,
          color: "#1e1e2e",
          padding: "5px",
          borderRadius: "5px",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        <b>{tagToSelectionType(picture.tags[0])}</b>
      </div>
      <div
        style={{
          backgroundColor: "#45475a",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            color: "#bac2de",
          }}
        >
          Name
        </div>
        <div>
          <b>{picture.name}</b>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#45475a",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        <div>Taken at</div>
        <div>
          <b>
            {picture.timestamp.toLocaleString(undefined, {
              timeZone: "Asia/Kolkata",
            })}
          </b>
        </div>
      </div>
    </div>
  )
}
