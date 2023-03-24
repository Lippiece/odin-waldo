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

const storageCharacters     = ( localStorage.getItem( "characters" ) )
export const charactersAtom = atom(
  JSON.parse( storageCharacters ) || [] )

const storageRecords     = localStorage.getItem( "records" )
export const recordsAtom = atom(
  JSON.parse( storageRecords ) as Records || new Map() as Records )

const storageTimestamps     = localStorage.getItem( "timestamps" )
export const timestampsAtom = atom(
  storageTimestamps ?
  JSON.parse( storageTimestamps ) as Characters :
  new Map() as Characters )
