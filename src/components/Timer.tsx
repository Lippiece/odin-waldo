import { Text }                from "@blueprintjs/core"
import { useAtom }             from "jotai"
import { useEffect, useState } from "react"
import { useLocation }         from "react-router-dom"

import { imageAtom } from "../state/atoms"

const Timer = () => {
  const [ image ]         = useAtom( imageAtom )
  const location          = useLocation()
  const [ time, setTime ] = useState( 0 )

  useEffect( () => {
    const inGame        = location.pathname === "/odin-waldo/app"
    const imageSelected = Boolean( image )
    const isRunning     = inGame && imageSelected
    const msInASecond   = 1000
    const interval      = setInterval( () => {
      isRunning && setTime( time + 1 )
    }, msInASecond )
    return () => clearInterval( interval )
  }, [ time, location.pathname, image ] )

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
