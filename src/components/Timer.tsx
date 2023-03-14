import { Text }                from "@blueprintjs/core"
import { useEffect, useState } from "react"

const Timer = () => {
  const [ time, setTime ]           = useState( 0 )
  const [ isRunning, setIsRunning ] = useState( false )

  useEffect( () => {
    const msInASecond = 1000
    const interval    = setInterval( () => {
      isRunning && setTime( time + 1 )
    }, msInASecond )
    return () => clearInterval( interval )
  }, [ time, isRunning ] )

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
