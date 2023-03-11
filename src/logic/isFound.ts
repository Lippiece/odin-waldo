// example Point: [123, 456]
type Point = [ number, number ]

const getDistance = ( a: Point, b: Point ): number => {
  const [ x1, y1 ] = a
  const [ x2, y2 ] = b

  return Math.sqrt( ( x2 - x1 ) ** 2 + ( y2 - y1 ) ** 2 )
}

// Checks if a point is within a radius of another point.
const isFound = ( a: Point, b: Point, radius: number ): boolean => {
  const distance: boolean = getDistance( a, b )
  return distance <= radius
}

export default isFound
