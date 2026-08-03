import {LoginPage} from './auth/pages/LoginPage.jsx'
import {useReducer} from "react";
import {LoginReducer} from "./auth/reducers/LoginReducer.js";
import Swal from "sweetalert2";
import {loginAction, logoutAction} from "./auth/reducers/LoginActions.js"
import {UsersPage} from "./pages/UsersPage.jsx";
import {Navbar} from "./layout/Navbar.jsx";
import {useLogin} from "./auth/hooks/useLogin.js";
import {Route, Routes,Navigate} from "react-router-dom";
import {UserRoutes} from "./routes/UserRoutes.jsx";


export const UsersApp = () => {

    const {
        login,
        handleLogout,
        handleLogin
    } = useLogin();



    return (
        <Routes>
            {login.isAuth ? (
                <Route path="/*"  element={<UserRoutes login={login} handleLogout={handleLogout} /> } />
              ) :
                <>
                    <Route path="login" element={<LoginPage handleLogin={handleLogin} />} />
                    <Route path="/*" element={<Navigate to="/login" />} />

                    </>

            }

        </Routes>
    );

}
