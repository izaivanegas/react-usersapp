import {NavLink} from "react-router-dom";
import {useContext} from "react";


import {useUsers} from "../hooks/useUsers.js";
import {useLogin} from "../auth/hooks/useLogin.js";


export const UserRow = ({id, username, email,password, admin}) =>{

    //const {handlerRemoveUser, handleEditUser} = useContext(UserContext)
    const {handlerRemoveUser, handleEditUser} = useUsers()


    //const {login} = useContext(LoginContext);
    const {login} = useLogin()
    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{username}</td>
                <td>{email}</td>
                <td>{admin?'Si':'No'}</td>
                {!login.isAdmin ||
                    <>
                <td>
                    <button type="button" className="btn btn-warning"

                            onClick={()=> handleEditUser(
                                {
                                    id: id,
                                    username: username,
                                    email: email,
                                    password: password,
                                    admin:admin

                                }
                            )}
                    >Update</button>
                </td>
                <td>
                    <NavLink to={'/users/edit/'+id} className="btn btn-secondary btn-sm" >Update route</NavLink>
                </td>
                <td>
                    <button className="btn btn-warning"
                            onClick={()=>handlerRemoveUser(id)}

                    >Delete</button>
                </td>
                    </>
                }
            </tr>
        </>
    );
}