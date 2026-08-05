import {LoginPage} from './auth/pages/LoginPage.jsx'
import {useLogin} from "./auth/hooks/useLogin.js";
import {Route, Routes, Navigate} from "react-router-dom";
import {UserRoutes} from "./routes/UserRoutes.jsx";
import {useContext} from "react";
import {LoginContext} from "./auth/context/LoginContext.jsx";


export const UsersApp = () => {

    const { login } = useContext(LoginContext)

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
