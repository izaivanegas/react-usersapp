import {LoginContext} from "./LoginContext.jsx";
import {useLogin} from "../hooks/useLogin.js";


export const LoginProvider = ({children})=>{

    const {
        login,
        handleLogout,
        handleLogin
    } = useLogin();


    return (
        <>
            <LoginContext.Provider value={{
                login,
                handleLogout,
                handleLogin
            }}>

                {children}
            </LoginContext.Provider>

        </>
    )
}