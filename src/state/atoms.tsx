import { atom } from "jotai"

import convertLinkToName from "../logic/convertLinkToName"

interface Characters {
  [ key: string ]: [ number, number ]
}

type Timestamps = Map<string, number>
type Records = Map<string, Timestamps>

const storageUser     = localStorage.getItem( "user" )
export const userAtom = atom( storageUser || "" )

const storageImage     = localStorage.getItem( "image" )
export const imageAtom = atom( storageImage || "" )

const storageTime     = localStorage.getItem( "time" )
export const timeAtom = atom( storageTime || 0 )

const storageCharacters     = ( localStorage.getItem( "characters" ) )
export const charactersAtom = atom<Characters>(
  JSON.parse( storageCharacters ) || [] )

const storageRecords     = localStorage.getItem( "records" )
export const recordsAtom = atom<Records>(
  JSON.parse( storageRecords ) || new Map() )

export const timestampsAtom = atom( get => {
  const records             = get( recordsAtom )
  const image               = get( imageAtom )
  const thisImageTimestamps = records
    .get( convertLinkToName( image ) )
  return thisImageTimestamps || new Map()
} )
