import {NavLink} from "react-router-dom";


export const UserRow = ({id, username, email,password, handlerRemoveUser, handleEditUser}) =>{

    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{username}</td>
                <td>{email}</td>
                <td>
                    <button type="button" className="btn btn-warning"

                            onClick={()=> handleEditUser(
                                {
                                    id: id,
                                    username: username,
                                    email: email,
                                    password: password,
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
            </tr>
        </>
    );
}