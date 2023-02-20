import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../css/Footer.css";
import { Link, Title1 } from "@fluentui/react-components";
const Footer = () => {
    return (_jsxs("footer", { children: [_jsx(Link, { href: "https://www.theodinproject.com", children: _jsx(Title1, { children: "The Odin Project" }) }), _jsx(Link, { href: "https://www.github.com/lippiece", children: _jsx(Title1, { children: "GitHub" }) })] }));
};
export default Footer;
