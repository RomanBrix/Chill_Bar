import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
// import Footer from "./footer";

// import Header from "./header";

function AdminLayout(props) {
    const { currentUser } = useSelector((state) => state.persistedReducer.user);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    // console.log(pathname);
    useEffect(() => {
        if (!currentUser && pathname !== "/admin") {
            navigate("/admin");
        } else if (currentUser && pathname === "/admin") {
            navigate("./orders");
        }
    }, [pathname, currentUser]);
    if (pathname === "/admin") return <Outlet />;
    if (currentUser)
        return (
            <>
                <AdminHeader />
                <Outlet />
            </>
        );

    return <h2>Loading</h2>;
}

export default AdminLayout;
