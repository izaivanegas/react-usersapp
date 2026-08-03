import {useReducer} from "react";
import {LoginReducer} from "../reducers/LoginReducer.js";
import {loginAction, logoutAction} from "../reducers/LoginActions.js";
import Swal from "sweetalert2";
import {loginUser} from "../../service/authService.js";
import {useNavigate} from "react-router-dom";


const initialLoginUser = JSON.parse(sessionStorage.getItem('login'))|| {
    isAuth: false,
    user: {
        username: "",
        password: "",
    }
}

export const useLogin = ()=>{

    const [login, dispatch] = useReducer(LoginReducer, initialLoginUser)

    const navigate = useNavigate();

    /**
     * Se usara para hacer la logica del login
     * @param username
     * @param password
     */
    const handleLogin = ({username, password})=>{
        console.log("datos: "  + username +"pass:" +  password)
        const isLogin = loginUser({username, password})
        if(isLogin){
            const user = {username:'admin', password:'admin'};
            dispatch({
                type: loginAction,
                payload: user
            })
            console.log(login)
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user:user
            }));
            navigate('/users')
        }else{
            Swal.fire("warning", "Datos incorrectos", "error")
        }
    }

    const handleLogout = ()=>{

        dispatch({
            type: logoutAction,
        })
        sessionStorage.removeItem('login')

    }


    return{
        login,
        handleLogin,
        handleLogout,
    }

}