import {Navigate, Route, Routes} from "react-router-dom";
import {UsersPage} from "../pages/UsersPage.jsx";
import {Navbar} from "../layout/Navbar.jsx";


export const UserRoutes = ({login, handleLogout})=>{


    return (<>

        <Navbar login={login}  handleLogout={handleLogout} />
        <Routes>
            <Route path="users" element={<UsersPage />} />
            <Route path="/" element={<Navigate to="/users" />} />

        </Routes>
    </>)
}