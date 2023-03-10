import convertLinkToName from "../logic/convertLinkToName"

describe( "link conversion", () => {
  test( "convertLinkToName", () => {
    const link     = "https://firebasestorage.googleapis.com/v0/b/waldo-693b9.appspot.com/o/images%2Fquentin.png?alt=media&token=70125576-efc0-4b58-8f43-e696bc221507"
    const expected = "quentin"
    const actual   = convertLinkToName( link )
    expect( actual ).toBe( expected )
  } )
} )
