// eslint-disable sort-keys-fix/sort-keys-fix
import "./css/App.css";

import {
  BrandVariants,
  createDarkTheme,
  FluentProvider,
} from "@fluentui/react-components";
import { Outlet } from "react-router-dom";

import Footer from "./components/Footer";
import Nav from "./components/Nav";

const customBrandRamp: BrandVariants = {
  10 : "#882c00",
  100: "#ff9b71",
  110: "#ff9b71",
  120: "#ff9b71",
  130: "#ff9b71",
  140: "#ff9b71",
  150: "#ff9b71",
  160: "#ff9b71",
  20 : "#a33c00",
  30 : "#b94d00",
  40 : "#d05e00",
  50 : "#e56f00",
  60 : "#ff9b71",
  70 : "#ff9b71",
  80 : "#ff9b71",
  90 : "#ff9b71",
};

const theme = createDarkTheme(customBrandRamp)
const App   = () => {
  return (
    <FluentProvider theme={ theme }>
      <Nav/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </FluentProvider>
  )
}

export default App;
