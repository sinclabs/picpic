import React, {
  KeyboardEvent,
  createRef,
  useEffect,
  useMemo,
  useState,
} from "react"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"

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
import { PictureDetails } from "./PictureDetails"
import { SelectionDetails } from "./SelectionDetails"

const App = () => {
  const [allPictures, setAllPictures] = useState<Picture[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [selectionFilter, setSelectionFilter] = useState<
    SelectionType | undefined
  >(undefined)
  const selectedThumbnail = createRef<HTMLDivElement>()

  useEffect(() => {
    readAndSortPicturesFromDisk().then(setAllPictures).catch(console.error)
  }, [])

  const pictures = useMemo(
    () =>
      filterPictures(allPictures, {
        selectionType: selectionFilter,
      }),
    [allPictures, selectionFilter]
  )
  const totalCount = useMemo(() => allPictures.length, [allPictures])
  const selectedMainCount = useMemo(
    () =>
      filterPictures(allPictures, {
        selectionType: "selected-main",
      }).length,
    [allPictures]
  )
  const selectedMemoryCount = useMemo(
    () =>
      filterPictures(allPictures, {
        selectionType: "selected-memory",
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
  const rejectedCount = useMemo(
    () =>
      filterPictures(allPictures, {
        selectionType: "rejected",
      }).length,
    [allPictures]
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const scrollThumbnailIntoView = () =>
      selectedThumbnail.current?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      })

    if (e.key === "ArrowLeft") {
      e.preventDefault()

      selectedIndex - 1 >= 0 && setSelectedIndex(selectedIndex - 1)
      scrollThumbnailIntoView()
    } else if (e.key === "ArrowRight") {
      e.preventDefault()

      selectedIndex + 1 <= pictures.length - 1 &&
        setSelectedIndex(selectedIndex + 1)
      scrollThumbnailIntoView()
    } else if (e.key === " ") {
      e.preventDefault()

      toggleTag()
    } else if (e.key === "m") {
      e.preventDefault()

      memoryTag()
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
        let picIndex = selectedIndex
        if (selectionFilter) {
          picIndex = allPictures.findIndex((p) => p.path === pic.path)
        }
        allPictures[picIndex].tags = []
        setAllPictures([...allPictures])
      })
      .catch(console.error)
  }

  const toggleTag = () => {
    const pic = pictures[selectedIndex]
    const selectionType = tagToSelectionType(pic.tags[0])

    let selectionTypeToSet: SelectionType = "selected-main"
    if (selectionType === "selected-main") {
      selectionTypeToSet = "maybe"
    }

    const tag = selectionTypeToTag(selectionTypeToSet)
    if (!tag) {
      return
    }

    setTagOnDisk(tag, pic.path)
      .then(() => {
        let picIndex = selectedIndex
        if (selectionFilter) {
          picIndex = allPictures.findIndex((p) => p.path === pic.path)
        }
        allPictures[picIndex].tags = [tag]
        setAllPictures([...allPictures])
      })
      .catch(console.error)
  }

  const memoryTag = () => {
    const pic = pictures[selectedIndex]
    let selectionTypeToSet: SelectionType = "selected-memory"
    const tag = selectionTypeToTag(selectionTypeToSet)
    if (!tag) {
      return
    }

    setTagOnDisk(tag, pic.path)
      .then(() => {
        let picIndex = selectedIndex
        if (selectionFilter) {
          picIndex = allPictures.findIndex((p) => p.path === pic.path)
        }
        allPictures[picIndex].tags = [tag]
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
          selectedRef={selectedThumbnail}
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Zoom>
                <img
                  src={pictureURI(pictures[selectedIndex])}
                  alt={pictures[selectedIndex].name + ""}
                  style={{
                    maxHeight: "calc(100vh - 280px)",
                    maxWidth: "calc(100vw - 100px)",
                  }}
                ></img>
              </Zoom>
              <div
                style={{
                  padding: "10px",
                  color: "#cdd6f4",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "250px",
                }}
              >
                <PictureDetails picture={pictures[selectedIndex]} />
                <SelectionDetails
                  selectedMainCount={selectedMainCount}
                  selectedMemoryCount={selectedMemoryCount}
                  rejectedCount={rejectedCount}
                  maybeCount={maybeCount}
                  totalCount={totalCount}
                  selectionFilter={selectionFilter}
                  setSelectionFilter={setSelectionFilter}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
