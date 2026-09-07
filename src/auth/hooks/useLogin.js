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
    },
    isAdmin: false
}

export const useLogin = ()=>{

    const [login, dispatch] = useReducer(LoginReducer, initialLoginUser)

    const navigate = useNavigate();

    /**
     * Se usara para hacer la logica del login
     * @param username
     * @param password
     */
    const handleLogin = async ({username, password})=>{
        console.log("datos: "  + username +"pass:" +  password)

        try{

            const response =  await loginUser({username, password})

            const  token = response.data.token;

            const claims = JSON.parse(window.atob(token.split(".")[1]));
            console.log(claims);



            //const user = {username:'admin', password:'admin'};
            const user = {username: response.data.username, password: '***********'}

            dispatch({
                type: loginAction,
                payload: {user, isAdmin: claims.isAdmin}
            })
            console.log(login)
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user:user,
                isAdmin: claims.isAdmin,
            }));

            sessionStorage.setItem('token',  "Bearer ".concat(response.data.token));

            const miToken = sessionStorage.getItem('token')


            navigate('/users')
        }catch (error){
            if(error.response?.status === 401){
                Swal.fire("warning", "Datos incorrectos", "error")
            }else if (error.response?.status === 403){
                Swal.fire("warning", "No tiene persmisos para el recurso solicitado", "error")
            }else {
                throw error;
            }


        }
    }

    const handleLogout = ()=>{

        dispatch({
            type: logoutAction,
        })
        sessionStorage.removeItem('login')
        sessionStorage.removeItem('token')
        sessionStorage.clear()

    }


    return{
        login,
        handleLogin,
        handleLogout,
    }

}