const convertLinkToName = ( link: string ) => {
  const decodedLink      = decodeURI( link )
  const lastPart         = decodedLink.split( "/" ).pop()
  const withoutExtension = lastPart?.split( "." ).shift()
  const without2F        = withoutExtension?.split( "%2F" ).pop()
  return without2F || ""
}

export default convertLinkToName
