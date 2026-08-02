import {LoginPage} from './auth/pages/LoginPage.jsx'
import {useReducer} from "react";
import {LoginReducer} from "./auth/reducers/LoginReducer.js";
import Swal from "sweetalert2";
import {loginAction} from "./auth/reducers/LoginActions.js"
import {UsersPage} from "./pages/UsersPage.jsx";

const initialLoginUser = {
    isAuth: false,
    user: {
        username: "",
        password: "",
    }
}

export const UsersApp = () => {

    const [login, dispatch] = useReducer(LoginReducer, initialLoginUser)


    /**
     * Se usara para hacer la logica del login
     * @param username
     * @param password
     */
    const handleLogin = ({username, password})=>{
        console.log("datos: "  + username +"pass:" +  password)
        if(username === 'admin' && password === 'admin'){
            const user = {username:'admin', password:'admin'};
            dispatch({
                type: loginAction,
                payload: user
            })
            console.log(login)
        }else{
            Swal.fire("warning", "Datos incorrectos", "error")
        }
    }

    return (
        <>
            {login.isAuth ? <UsersPage /> : <LoginPage handleLogin={handleLogin}/> }

        </>
    );

}
