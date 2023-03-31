import { atom } from "jotai"

interface Characters {
  [ key: string ]: [ number, number ]
}

type Timestamps = Map<string, number>
type Records = Map<string, Timestamps>

const storageUser     = localStorage.getItem( "user" )
export const userAtom = atom( storageUser || "" )

const storageImage     = localStorage.getItem( "image" )
export const imageAtom = atom( storageImage || "" )

const storageTime     = Number( localStorage.getItem( "time" ) )
export const timeAtom = atom( storageTime || 0 )

const storageCharacters      = ( localStorage.getItem( "characters" )
)
const characters: Characters = JSON.parse( storageCharacters ) || []
export const charactersAtom  = atom(
    characters )

const storageRecords       = localStorage.getItem( "records" )
const storageRecordsParsed = storageRecords && JSON.parse( storageRecords )
console.log( "storageRecordsParsed", storageRecordsParsed )
const records: Records   = new Map( storageRecordsParsed )
export const recordsAtom = atom(
    records )

const storageTimestamps      = localStorage.getItem( "timestamps" )
const timestampsParsed       = storageTimestamps && JSON.parse(
    storageTimestamps )
const timestamps: Timestamps = new Map( timestampsParsed )
export const timestampsAtom  = atom(
    timestamps )
