import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"

const signUp = async ( email: string, password: string, app ) => {
  try {
    const auth       = getAuth()
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const { user }   = credential
    return user
  } catch ( error ) {
    return console.error( error )
  }
}

export default signUp
