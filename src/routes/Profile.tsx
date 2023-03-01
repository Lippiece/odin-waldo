import { useLoaderData } from "react-router-dom"

import Settings          from "../components/Settings"
import { useAppContext } from "../context/context"

const Stats = () => {
  const { user } = useAppContext()

  return <section hidden={ !user }>
    <h2>Stats</h2>
  </section>
}

const Profile = () => {
  const images = useLoaderData()
  return (
    <>
      <h1>Hello from Profile</h1>
      <Settings images={ images }/>
      <Stats/>
    </>
  )
}

export default Profile
