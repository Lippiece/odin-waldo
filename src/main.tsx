import { StrictMode }     from "react"
import ReactDOM           from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { ContextProvider } from "./context/context"
import router              from "./routes/router"

const root = ReactDOM.createRoot(
  document.querySelector( "#root" ) as HTMLElement
)

root.render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={ router }/>
    </ContextProvider>
  </StrictMode>
)
