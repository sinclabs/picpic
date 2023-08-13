import React, { FC } from "react"
import { TagBadge } from "./TagBadge"
import { Picture } from "./types"

const getTagColors = (tag: "Yellow" | "Green" | "Purple") => {
  switch (tag) {
    case "Yellow":
      return {
        primary: "#f9e2af",
        secondary: "#df8e1d",
      }
    case "Green":
      return {
        primary: "#a6e3a1",
        secondary: "#40a02b",
      }
    case "Purple":
      return {
        primary: "#cba6f7",
        secondary: "#8839ef",
      }
  }
}

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
        if (tag === "Yellow" || tag === "Green" || tag === "Purple") {
          const colors = getTagColors(tag)
          return (
            <TagBadge
              key={`selection-tag-${picture.name}-${tagIndex}`}
              primaryColor={colors.primary}
              secondaryColor={colors.secondary}
            />
          )
        }
      })}
    </div>
  )
}
