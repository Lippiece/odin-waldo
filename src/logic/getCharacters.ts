import { doc, getDoc, getFirestore } from "firebase/firestore"

const getCharacters = async ( image: string ) => {
  const database          = getFirestore( window.firebase )
  const imageName         = image.split( "/" ).pop()
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
