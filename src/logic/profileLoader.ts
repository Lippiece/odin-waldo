import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage"

const getImagesFromStorage = async () => {
  try {
    const storage       = getStorage( window.firebase )
    const listReference = ref( storage, "images" )
    const listResult    = await listAll( listReference )
    return await Promise.all(
      listResult.items.map( async item => {
        const { name, fullPath } = item
        const url                = await getDownloadURL(
          ref( storage, fullPath ) )
        return { name, url }
      } ) )
  } catch ( error ) {
    console.error( error )
    return []
  }
}

const profileLoader = () => getImagesFromStorage()

export default profileLoader
