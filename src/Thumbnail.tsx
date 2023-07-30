import { Picture } from "./types"

import React, { FC, LegacyRef } from "react"
import { pictureURI } from "./pictureOps"
import { Tags } from "./Tags"

type Props = {
  picture: Picture
  currentIndex: number
  selectedIndex: number
  setSelectedIndex: (v: number) => void
  selectedRef?: LegacyRef<HTMLDivElement>
}

export const Thumbnail: FC<Props> = ({
  picture,
  currentIndex,
  selectedIndex,
  setSelectedIndex,
  selectedRef,
}: Props) => {
  return (
    <div
      style={{
        display: "inline",
        position: "relative",
      }}
      ref={selectedIndex === currentIndex ? selectedRef : undefined}
    >
      <img
        src={pictureURI(picture)}
        alt={`Thumnail for ${picture.name}`}
        style={{
          maxHeight: "170px",
          border: selectedIndex === currentIndex ? "3px solid #89b4fa" : "none",
          borderRadius: "5px",
          margin: "10px 10px 10px 0px",
        }}
        onClick={() => setSelectedIndex(currentIndex)}
        loading="lazy"
      ></img>
      <Tags picture={picture} />
    </div>
  )
}
