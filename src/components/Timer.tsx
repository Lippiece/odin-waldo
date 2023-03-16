import { Text }                from "@blueprintjs/core"
import { useEffect, useState } from "react"
import { useLocation }         from "react-router-dom"

import { useAppContext } from "../context/context"

const Timer = () => {
  const location          = useLocation()
  const context           = useAppContext()
  const [ time, setTime ] = useState( 0 )

  useEffect( () => {
    const inGame        = location.pathname === "/odin-waldo/app"
    const imageSelected = Boolean( context.image )
    const isRunning     = inGame && imageSelected
    const msInASecond   = 1000
    const interval      = setInterval( () => {
      isRunning && setTime( time + 1 )
    }, msInASecond )
    return () => clearInterval( interval )
  }, [ time, location.pathname, context.image ] )

  return <>
    <Text
      title="Timer"
      tagName="h2"
    >{ formatTime( time ) }</Text>
  </>
}

const formatTime = ( seconds: number ) => {
  const secondsInMinute: number = 60
  const minutes                 = Math.floor( seconds / secondsInMinute )
  const seconds_                = seconds % secondsInMinute
  const minutesFormatted        = minutes < 10 ? `0${ minutes }` : minutes
  const secondsFormatted        = seconds_ < 10 ? `0${ seconds_ }` : seconds_
  return `${ minutesFormatted }:${ secondsFormatted }`
}

export default Timer
