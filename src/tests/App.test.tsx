/* eslint-disable fp/no-unused-expression, fp/no-nil*/
/* eslint-disable react/forbid-elements */
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {MemoryRouter, Route, Routes} from "react-router-dom"

import Nav from "../components/Nav"
import Settings from "../components/Settings"
import {ContextProvider, useAppContext, useAppDispatch} from "../context/context"
import Game from "../routes/Game"

const images = [
  {
    name: "waldo",
    url : "https://i.imgur.com/9YQ9qX1.png",
  },
  {
    name: "odin",
    url : "https://i.imgur.com/9YQ9qX1.png",
  },
]
const Profile = () => <Settings images={images}/>

const withCustomRoutes = (routes: JSX.Element,
                          links: string[]) => () =>
  <MemoryRouter
    initialEntries={[ links[ links.length - 1 ] ]}
  >
    <ContextProvider>
      <Nav/>
      <Routes>
        {routes}
      </Routes>
    </ContextProvider>
  </MemoryRouter>

const imageSelectionRoutes = (
  <>
    <Route path="/odin-waldo/app" element={<Game/>}/>
    <Route path="/odin-waldo/profile" element={<Profile/>}/>
  </>
)
const imageSelectionLinks = [ "/odin-waldo/app", "/odin-waldo/profile" ]
const ImageSelection = withCustomRoutes(imageSelectionRoutes,
  imageSelectionLinks)

const authenticationRoutes = (
  <Route path="/odin-waldo/profile" element={<Profile/>}/>
)
const authenticationLinks = [ "/odin-waldo/profile" ]
const Authentication = withCustomRoutes(authenticationRoutes,
  authenticationLinks)

describe("image selection", () => {
  test("should select and show an image in play menu", async () => {
    render(<ImageSelection/>)
    const user = userEvent.setup()

    await user.click(screen.getAllByRole("button")[ 0 ])
    await user.click(screen.getByText(/play/iu))

    expect(screen.getByText(/selected/iu))
  })
})

describe("authentication", () => {
  test("should greet anonymous user", () => {
    render(<Authentication/>)
    expect(screen.getByText(/anonymous/iu))
  })

  vi.mock("../components/UserBox.tsx", () => ({
    default: () => {
      const {user} = useAppContext()
      const dispatch = useAppDispatch()
      const userOrAnonymous = user?.email || "Anonymous"

      return <section>
        <p>{`Hi, ${userOrAnonymous}`}</p>
        {!user && <form
          onSubmit={event => {
            event.preventDefault()
            dispatch({
              payload: {
                email   : "email@email.email",
                password: "password",
              },
              type: "update user",
            })
          }}
        >
          <button type="submit">Sign in</button>
        </form>}
      </section>
    },
  }))

  test("should greet authenticated user", async () => {
    render(<Authentication/>)
    const user = userEvent.setup()

    await user.click(screen.getByText(/sign/iu))

    expect(screen.getByText(/hi/iu))
  })

  test("should show stats for authenticated user", async () => {
    render(<Authentication/>)
    const user = userEvent.setup()

    expect(screen.queryByText(/stat/iu)).toBeNull()

    await user.click(screen.getByText(/sign/iu))

    expect(screen.getByText(/stat/iu))
  })
})
