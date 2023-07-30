import { Picture } from "./types"

import React, { FC, KeyboardEventHandler, LegacyRef } from "react"
import { Thumbnail } from "./Thumbnail"

export const FilmRoll: FC<{
  handleKeyDown: KeyboardEventHandler
  gridAreaName: string
  pictures: Picture[]
  selectedIndex: number
  setSelectedIndex: (v: number) => void
  selectedRef: LegacyRef<HTMLDivElement>
}> = ({
  gridAreaName,
  handleKeyDown,
  pictures,
  selectedIndex,
  setSelectedIndex,
  selectedRef,
}) => {
  return (
    <div
      onKeyDown={handleKeyDown}
      style={{
        gridArea: gridAreaName,
        backgroundColor: "#363a4f",
        borderRadius: "8px",
        overflow: "auto hidden",
        whiteSpace: "nowrap",
        paddingLeft: "10px",
      }}
    >
      {pictures.map((pic, index) => (
        <Thumbnail
          key={`thumbnail-${index}`}
          picture={pic}
          currentIndex={index}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          selectedRef={selectedRef}
        />
      ))}
    </div>
  )
}
