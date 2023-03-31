import { doc, getDoc, getFirestore } from "firebase/firestore"

import convertLinkToName from "./convertLinkToName"

const getCharacters = async ( image: string ) => {
  const database          = getFirestore( window.firebase )
  const imageName         = convertLinkToName( image )
  const documentReference = doc( database, `/images/${ imageName }` )
  try {
    const documentSnapshot = await getDoc(
        documentReference )
    const data             = documentSnapshot.data()
    return data || []
  } catch ( error ) {
    console.error( error )
    return []
  }
}

export default getCharacters
