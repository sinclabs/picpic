import React, { FC } from "react"

export const TagBadge: FC<{ primaryColor: string; secondaryColor: string }> = ({
  primaryColor,
  secondaryColor,
}) => {
  return (
    <div
      style={{
        backgroundColor: primaryColor,
        width: "10px",
        height: "10px",
        borderRadius: "100%",
        border: `2px solid ${secondaryColor}`,
      }}
    ></div>
  )
}
