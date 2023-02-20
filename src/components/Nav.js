import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../css/Nav.css";
import { Link as FluentLink, Title1 } from "@fluentui/react-components";
import { Link } from "react-router-dom";
const Nav = () => {
    return (_jsxs("nav", { children: [_jsx(Link, { to: "/odin-waldo/", children: _jsx(FluentLink, { children: _jsx(Title1, { as: "h1", children: "Logo" }) }) }), _jsx(Link, { to: "/odin-waldo/app", children: _jsx(FluentLink, { children: _jsx(Title1, { as: "h1", children: "Play" }) }) }), _jsx(Link, { to: "/odin-waldo/profile", children: _jsx(FluentLink, { children: _jsx(Title1, { as: "h1", children: "Profile" }) }) })] }));
};
export default Nav;
