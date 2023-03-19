import { atom } from "jotai"

export const userAtom  = atom( "" )
export const imageAtom = atom( "" )
export const timeAtom  = atom( 0 )

interface Characters {
  [ key: string ]: [ number, number ]
}

export const charactersAtom = atom<Characters>( [] )
