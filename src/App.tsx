import React, { KeyboardEvent, useEffect, useMemo, useState } from "react"
import "./App.css"

import {
  pictureURI,
  readAndSortPicturesFromDisk,
  setTag as setTagOnDisk,
  removeTag as removeTagOnDisk,
  filterPictures,
} from "./pictureOps"
import { FilmRoll } from "./FilmRoll"
import {
  Picture,
  SelectionType,
  selectionTypeToTag,
  tagToSelectionType,
} from "./types"

const App = () => {
  const [allPictures, setAllPictures] = useState<Picture[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  useEffect(() => {
    readAndSortPicturesFromDisk().then(setAllPictures).catch(console.error)
  }, [])

  const pictures = useMemo(() => filterPictures(allPictures), [allPictures])
  const totalCount = useMemo(() => allPictures.length, [allPictures])
  const selectedCount = useMemo(
    () =>
      filterPictures(allPictures, {
        selectionType: "selected",
      }).length,
    [allPictures]
  )
  const maybeCount = useMemo(
    () =>
      filterPictures(allPictures, {
        selectionType: "maybe",
      }).length,
    [allPictures]
  )
  const noCount = useMemo(
    () =>
      filterPictures(allPictures, {
        selectionType: "no",
      }).length,
    [allPictures]
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()

      selectedIndex - 1 >= 0 && setSelectedIndex(selectedIndex - 1)
    } else if (e.key === "ArrowRight") {
      e.preventDefault()

      selectedIndex + 1 <= pictures.length - 1 &&
        setSelectedIndex(selectedIndex + 1)
    } else if (e.key === " ") {
      e.preventDefault()

      toggleTag()
    } else if (e.key === "x") {
      e.preventDefault()

      removeTag()
    }
  }

  const removeTag = () => {
    const pic = pictures[selectedIndex]
    const tagToRemove = pic.tags[0]
    if (!tagToRemove) {
      return
    }

    removeTagOnDisk(tagToRemove, pic.path)
      .then(() => {
        allPictures[selectedIndex].tags = []
        setAllPictures([...allPictures])
      })
      .catch(console.error)
  }

  const toggleTag = () => {
    const pic = pictures[selectedIndex]
    const selectionType = tagToSelectionType(pic.tags[0])

    let selectionTypeToSet: SelectionType = "selected"
    if (selectionType === "selected") {
      selectionTypeToSet = "maybe"
    }

    const tag = selectionTypeToTag(selectionTypeToSet)
    if (!tag) {
      return
    }

    setTagOnDisk(tag, pic.path)
      .then(() => {
        allPictures[selectedIndex].tags = [tag]
        setAllPictures([...allPictures])
      })
      .catch(console.error)
  }

  if (allPictures.length === 0) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#24273a",
          display: "grid",
        }}
      >
        <div
          style={{
            alignSelf: "center",
            justifySelf: "center",
            color: "#cdd6f4",
            fontFamily: "sans-serif",
            fontStyle: "italic",
          }}
        >
          ⏳ Loading...
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#24273a",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "calc(100vw - 50px)",
          height: "calc(100vh - 50px)",
          margin: "auto",
          display: "grid",
          gridTemplateRows: "200px 1fr",
          gridTemplateAreas: `
            "thumbnails"
            "main-image"
          `,
          gap: "10px",
        }}
      >
        <FilmRoll
          gridAreaName={"thumbnails"}
          handleKeyDown={handleKeyDown}
          pictures={pictures}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <div
          style={{
            gridArea: "main-image",
            backgroundColor: "#363a4f",
            borderRadius: "8px",
            padding: "10px",
            margin: "auto",
          }}
        >
          {pictures[selectedIndex] && (
            <img
              src={pictureURI(pictures[selectedIndex])}
              alt={pictures[selectedIndex].name}
              style={{
                maxHeight: "calc(100vh - 280px)",
                maxWidth: "calc(100vw - 100px)",
              }}
            ></img>
          )}
          <div style={{}}>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
