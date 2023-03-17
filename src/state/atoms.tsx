import { atom } from "jotai"

export const userAtom  = atom( "" )
export const imageAtom = atom( "" )

interface Characters {
  [ key: string ]: [ number, number ]
}

export const charactersAtom = atom<Characters>( [] )
