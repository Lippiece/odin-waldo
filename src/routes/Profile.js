import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLoaderData } from "react-router-dom";
const Profile = () => {
    const data = useLoaderData();
    return (_jsxs("div", { children: [_jsx("h1", { children: "Hello from Profile" }), data.map((user) => (_jsxs("div", { children: [_jsx("h2", { children: user.name }), _jsx("p", { children: user.email })] }, user.id)))] }));
};
export default Profile;
