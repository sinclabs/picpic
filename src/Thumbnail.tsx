import { Picture } from "./types"

import React, { FC } from "react"
import { pictureURI } from "./pictureOps"
import { Tags } from "./Tags"

type Props = {
  picture: Picture
  currentIndex: number
  selectedIndex: number
  setSelectedIndex: (v: number) => void
}

export const Thumbnail: FC<Props> = ({
  picture,
  currentIndex,
  selectedIndex,
  setSelectedIndex,
}: Props) => {
  return (
    <div
      // key={`thumbnail-${index}`}
      style={{
        display: "inline",
        position: "relative",
      }}
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
      ></img>
      <Tags picture={picture} />
    </div>
  )
}
