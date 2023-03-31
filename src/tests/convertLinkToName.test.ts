import convertLinkToName from "../logic/convertLinkToName"

describe( "link conversion", () => {
  test( "convertLinkToName", () => {
    const links    = [ "https://firebasestorage.googleapis.com/v0/b/waldo-693b9.appspot.com/o/images%2Fquentin.png?alt=media&token=70125576-efc0-4b58-8f43-e696bc221507",
                       "https://firebasestorage.googleapis.com/v0/b/waldo-693b9.appspot.com/o/images%2Fdoodle.png?alt=media&token=cb418205-fe99-4312-95e4-c7bd9c3eb280",
    ]
    const expected = [ "quentin", "doodle" ]
    const actuals  = links.map( link => convertLinkToName( link ) )
    expect( actuals ).toEqual( expected )
  } )
} )
