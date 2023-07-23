import React, { FC } from "react"
import { TagBadge } from "./TagBadge"
import { Picture } from "./types"

export const Tags: FC<{ picture: Picture }> = ({ picture }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "-154px",
        right: "15px",
        width: "20px",
        height: "20px",
      }}
    >
      {picture.tags.map((tag, tagIndex) => {
        if (tag === "Yellow" || tag === "Green") {
          return (
            <TagBadge
              key={`selection-tag-${picture.name}-${tagIndex}`}
              primaryColor={tag === "Yellow" ? "#f9e2af" : "#a6e3a1"}
              secondaryColor={tag === "Yellow" ? "#df8e1d" : "#40a02b"}
            />
          )
        }
      })}
    </div>
  )
}
