const getCoordinates = ( event: MouseEvent<HTMLImageElement> ) => {
  const { target, clientY, clientX }
                                 = event
  const { width, height }        = target
  const { top, left }            = target.getBoundingClientRect()
  const [ leftPosition,
          topPosition ]          = [
    Number( ( clientX - left ).toFixed( 0 ) ),
    Number( ( clientY - top ).toFixed( 0 ) ) ]
  const [ horizontal, vertical ] = [
    Number( ( leftPosition / width * 100 ).toFixed( 0 ) ),
    Number( ( topPosition / height * 100 ).toFixed( 0 ) ) ]
  return [ horizontal, vertical ]
}

export default getCoordinates
