import {Navigate, Route, Routes} from "react-router-dom";
import {UsersPage} from "../pages/UsersPage.jsx";
import {Navbar} from "../layout/Navbar.jsx";
import {RegisterPage} from "../pages/RegisterPage.jsx";

import {useContext} from "react";
import {LoginContext} from "../auth/context/LoginContext.jsx";
import {useLogin} from "../auth/hooks/useLogin.js";


export const UserRoutes = () => {
    //const {login} = useContext(LoginContext)
    const {login} = useLogin()

    return (<>



            <Navbar />
            <Routes>
                <Route path="users" element={<UsersPage />}/>
                {
                    !login.isAdmin || <>
                        <Route path="/users/register" element={<RegisterPage />}/>
                        <Route path="/users/edit/:id" element={<RegisterPage />}/>
                    </>
                }

                <Route path="/" element={<Navigate to="/users"/>}/>
            </Routes>

    </>)
}