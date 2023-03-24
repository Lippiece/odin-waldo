import { Text }        from "@blueprintjs/core"
import { useAtom }     from "jotai"
import { useEffect }   from "react"
import { useLocation } from "react-router-dom"

import { imageAtom, timeAtom } from "../state/atoms"

const Timer = () => {
  const [ image ]         = useAtom( imageAtom )
  const location          = useLocation()
  const [ time, setTime ] = useAtom( timeAtom )

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

  return <Text
    title="Timer"
    tagName="h2"
  >{ formatTime( time ) }</Text>
}

const formatTime = ( time: number ) => {
  const minutes = Math.floor( time / 60 )
  const seconds = time % 60
  return `${ minutes }:${ seconds < 10 ? `0${ seconds }` : seconds }`
}

export default Timer
