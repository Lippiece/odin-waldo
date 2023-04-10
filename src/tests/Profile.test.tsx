/* eslint-disable fp/no-unused-expression, fp/no-nil*/
import { render, screen }              from "@testing-library/react"
import userEvent                       from "@testing-library/user-event"
import { useAtom }                     from "jotai"
import { useEffect }                   from "react"
import { MemoryRouter, Route, Routes } from "react-router-dom"

import Nav                                     from "../components/Nav"
import Stats                                   from "../components/Stats"
import Game                                    from "../routes/Game"
import { charactersAtom, imageAtom, userAtom } from "../state/atoms"

const image      = "https://i.imgur.com/removed.png"
const characters = {
  odin: [ 1, 1 ],
}

vi.mock( "../logic/convertLinkToName.ts", () => ( {
      default: () => "removed",
    }
) )

const Router = () => {
  const [ , setImage ]      = useAtom( imageAtom )
  const [ , setCharacters ] = useAtom( charactersAtom )
  const [ , setUser ]       = useAtom( userAtom )
  useEffect( () => {
    setImage( image )
    setCharacters( characters )
    setUser( "user@email.email" )
  }, [] )
  return <MemoryRouter initialEntries={ [ "/odin-waldo/app" ] }>
    <Nav/>
    <Routes>
      <Route path="/odin-waldo/profile" element={ <Stats/> }/>
      <Route path="/odin-waldo/app" element={ <Game/> }/>
    </Routes>
  </MemoryRouter>
}

// vi.mock( "../components/UserBox.tsx", () => ( {
//       default: () => {
//         const [ user, setUser ] = useAtom( userAtom )
//         const userOrAnonymous   = user || "Anonymous"
//
//         return <section>
//           <p>{ `Hi, ${ userOrAnonymous }` }</p>
//           { !user && <form
//             onSubmit={ event => {
//               event.preventDefault()
//               setUser( "email@email.email" )
//             } }
//           >
//             <button type="submit">Sign in</button>
//           </form> }
//         </section>
//       },
//     }
// ) )

describe.concurrent( "records", () => {
  test( "should show records after all characters are selected",
        async () => {
          render( <Router/> )
          const user = userEvent.setup()

          expect( screen.getByText( /email/iu ) )

          await user.click( screen.getByRole( "img" ) )
          await user.click( screen.getByText( /odin/iu ) )
          expect( screen.getByText( /✔/u ) )

          await user.click( screen.getByText( /profile/iu ) )

          expect( screen.getByText( /removed/iu ) )
          expect( screen.getByText( /found odin/iu ) )
          expect( screen.getByText( /average/iu ) )
          expect( screen.getByText( /other/iu ) )
        },
  )

  test.skip( "should show other's records after all characters are selected",
             async () => {},
  )
} )
