import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import Home from "./routes/Home";
import Profile from "./routes/Profile";

const root          = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
const profileLoader = () =>
  fetch("https://jsonplaceholder.typicode.com/users");
const router        = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/odin-waldo/"
      element={<App />}
    >
      <Route
        path="/odin-waldo/"
        element={<Home />}
      />
      <Route
        path="/odin-waldo/app"
        element={<div />}
      />
      <Route
        loader={profileLoader}
        path="/odin-waldo/profile"
        element={<Profile />}
      />
    </Route>
  )
);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
