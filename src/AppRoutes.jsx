import {LoginPage} from './auth/pages/LoginPage.jsx'
import {Route, Routes, Navigate} from "react-router-dom";
import {UserRoutes} from "./routes/UserRoutes.jsx";
import {useContext} from "react";

import {useLogin} from "./auth/hooks/useLogin.js";

export const AppRoutes =()=>{
    //const { login } = useContext(LoginContext)
    const { login } = useLogin()

    return (
        <Routes>
            {login.isAuth ? (
                    <Route path="/*" element={<UserRoutes  />}/>
                ) :
                <>
                    <Route path="login" element={<LoginPage />}/>
                    <Route path="/*" element={<Navigate to="/login"/>}/>
                </>

            }

        </Routes>
    );


}