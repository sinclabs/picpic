import { promisify } from "util"
import { readdir } from "fs/promises"
import { exec as execSync } from "child_process"
import { Picture, SelectionType, selectionTypeToTag } from "./types"

const exec = promisify(execSync)

const FOLDER_NAME = "/Users/subbu/Documents/Selected Wedding Pictures"

export const filterPictures = (
  allPictures: Picture[],
  options?: {
    selectionType?: SelectionType
  }
) => {
  if (options?.selectionType === undefined) {
    return allPictures
  }

  const tagToLookFor = selectionTypeToTag(options.selectionType)
  return allPictures.filter((picture) =>
    tagToLookFor
      ? picture.tags.includes(tagToLookFor)
      : picture.tags.length === 0
  )
}

// This needs a server running locally to serve the images
// This can be avoided by useing the below mention `file`
// URIs but in my case this is super slow compared to
// running a server, as I am dealing with massive images
// and somehow webkit seems to be slow reading through
// the file URIs. Hence I am using the server approach
//
// "file:///" + picture.path.replace(/\\/g, "/")
//
// I am using the `live-server` npm package in the directory
// that contains the images and simply running it by calling
// `live-server .`
export const pictureURI = (picture: Picture) =>
  `http://localhost:8080/${encodeURIComponent(picture.name)}`

export const readAndSortPicturesFromDisk = async () => {
  const pictures = await readPictures()
  return pictures.sort((a, b) => +a.timestamp - +b.timestamp)
}

export async function readPictures(): Promise<Picture[]> {
  const pictures: Picture[] = []
  const filenames = await readdir(FOLDER_NAME)

  const filenamesWithPath = filenames.map((file) => `${FOLDER_NAME}/${file}`)
  const metadata = await readAllMetadata(filenamesWithPath)

  for (const [i, name] of filenames.entries()) {
    const path = filenamesWithPath[i]
    const timestamp = metadata[i].timestamp
    const tags = metadata[i].tags
    pictures.push({
      name,
      path,
      timestamp,
      tags,
    })
  }

  return pictures
}

function readTagsMultipleFiles(filenames: string[]) {
  return exec(`tag --list ${filenames.map((name) => `"${name}" `).join(" ")}`)
}

export function setTag(tag: string, filename: string) {
  return exec(`tag --set ${tag} "${filename.trim()}"`)
}

export function removeTag(tag: string, filename: string) {
  return exec(`tag --remove ${tag} "${filename.trim()}"`)
}

function readContentCreatedTimestampMultipleFiles(filenames: string[]) {
  return exec(
    `exiftool -d "%Y-%m-%d %H:%M:%S" -DateTimeOriginal -s3 -q ${filenames
      .map((name) => `"${name}" `)
      .join(" ")}`
  )
}

async function readAllTimestamps(filenames: string[]) {
  return (
    await readContentCreatedTimestampMultipleFiles(filenames)
  ).stdout.split("\n")
}

async function readAllTags(filenames: string[]) {
  const tagsRawOutput = (await readTagsMultipleFiles(filenames)).stdout

  const jointTagsLines = tagsRawOutput.split("\n")
  const jointTags = filenames.map((filename, i) =>
    jointTagsLines[i].replace(filename, "").trim()
  )

  return jointTags.map((jointTag) => (jointTag ? jointTag.split(",") : []))
}

async function readAllMetadata(filenames: string[]) {
  const timestamps = await readAllTimestamps(filenames)
  const tags = await readAllTags(filenames)

  return filenames.map((_, i) => ({
    timestamp: new Date(timestamps[i]),
    tags: tags[i],
  }))
}
