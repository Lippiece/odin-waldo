import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "../css/Home.css";
import { Body1, Body1Strong, Button, Title1, Title2, } from "@fluentui/react-components";
const Home = () => {
    return (_jsxs(_Fragment, { children: [_jsxs("section", { className: "hero", children: [_jsx(Title1, { as: "h1", children: "Welcome to Odin Waldo" }), _jsx(Title2, { as: "h2", children: "Find your favorite characters from a pool of images" }), _jsx(Button, { children: "Start tagging" })] }), _jsxs("section", { className: "about", children: [_jsx(Title1, { as: "h1", children: "About Odin Waldo" }), _jsx(Body1, { as: "p", children: "Odin Waldo is a photo tagging app that challenges users to find their favorite characters from a pool of images. With our easy-to-use interface, you'll have a blast trying to spot all the characters in our collection." })] }), _jsxs("section", { className: "features", children: [_jsx(Title2, { as: "h2", children: "Features" }), _jsxs("ul", { children: [_jsx("li", { children: _jsx(Body1Strong, { as: "p", children: "Pool of images to choose from" }) }), _jsx("li", { children: _jsx(Body1Strong, { as: "p", children: "Easy-to-use interface" }) }), _jsx("li", { children: _jsx(Body1Strong, { as: "p", children: "Compete with friends and family to find characters the fastest" }) })] })] }), _jsxs("section", { className: "call-to-action", children: [_jsx(Title1, { as: "h1", children: "Ready to get started?" }), _jsx(Button, { children: "Sign up now" })] })] }));
};
export default Home;
