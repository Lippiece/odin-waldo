/* eslint-disable fp/no-nil, fp/no-unused-expression */
import { render, screen }      from "@testing-library/react"
import userEvent               from "@testing-library/user-event"
import { useEffect, useState } from "react"

const Timer = () => {
  const formatTime = ( seconds: number ) => {
    const secondsInMinute: number = 60
    const minutes                 = Math.floor( seconds / secondsInMinute )
    const seconds_                = seconds % secondsInMinute
    const minutesFormatted        = minutes < 10 ? `0${ minutes }` : minutes
    const secondsFormatted        = seconds_ < 10 ? `0${ seconds_ }` : seconds_
    return `${ minutesFormatted }:${ secondsFormatted }`
  }

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
    <div>{ formatTime( time ) }</div>
    <button onClick={ () => setIsRunning( true ) }>Start</button>
    <button onClick={ () => setIsRunning( false ) }>Stop</button>
  </>
}

describe( "timer", () => {
  test( "should increment each second", async () => {
    render( <Timer/> )
    const user = userEvent.setup()

    await user.click( screen.getByText( "Start" ) )
    expect( await screen.findByText( /01/u ) )
    expect( await screen.findByText( /02/u ) )

    await user.click( screen.getByText( "Stop" ) )
    expect( await screen.findByText( /02/u ) )
  } )
} )
