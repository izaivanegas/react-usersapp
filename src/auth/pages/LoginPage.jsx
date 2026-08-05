import {useContext, useState} from "react";
import Swal from "sweetalert2";
import {LoginContext} from "../context/LoginContext.jsx";

const initialLoginForm = {
    username:'',
    password:'',
}

export const LoginPage = () => {

    const {handleLogin} = useContext(LoginContext);

    const [loginForm, setLoginForm] = useState(initialLoginForm)

    const {username, password} = loginForm

    const onInputOnChange = ({target})=>{
        //e.target.name
        //(e.target.value
        const {name, value} = target
        setLoginForm(
            {...loginForm,
            [name]: value}
            )
    }

    const onSubmit = (event)=>{
        event.preventDefault()
        console.log("OnSubmit")
        if( !username || !password  ){
            Swal.fire("warning", "Los datos son requeridos", "error")
            return
        }
        //Login:
        handleLogin({username, password})

    }
    return (
        <>
            <div className="modal" style={{display:"block"}} tabIndex="-1">
                <div className="modal-dialog">
                    <form onSubmit={onSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Login</h5>
                            </div>
                            <div className="modal-body">
                                    <input type="text" className="form-control" placeholder="Username" name="username" value={username}
                                           onChange={(e)=>onInputOnChange(e)}/>
                                    <input type="password" className="form-control" placeholder="Password" name="password" value={password}
                                           onChange={onInputOnChange}/>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}