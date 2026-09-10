
import  {UserRow} from "./UserRow";
import {useContext} from "react";
//import {UserContext} from "../context/UserContext.jsx";

import {useUsers} from "../hooks/useUsers.js";
import {useLogin} from "../auth/hooks/useLogin.js";

export const UsersList = () => {


    //const {users} = useContext(UserContext)
    const {users} = useUsers()


    //const {login} = useContext(LoginContext);
    const {login} = useLogin();

    const handleUpdate = ()=> {
        alert('update')
    }

    const handleDelete = ()=> {
        alert('delete')
    }

    return (
        <>
            <h3>Lista de usuarios</h3>
            <table className="table table-hover table-striped align-middle">
                <thead className="table-secondary">
                <tr>
                    <th>#</th>
                    <th>username</th>
                    <th>email</th>
                    <th>Admin</th>
                    {!login.isAdmin ||
                        <>
                            <th>update</th>
                            <th>update route</th>
                            <th>remove</th>
                        </>
                    }

                </tr>
                </thead>
                <tbody>
                {
                    users.map(({id, username, email, password, admin}) => (
                        <UserRow  key={id} id={id} username={username} email={email}
                                  password={password} admin={admin}

                        />
                    ))

                }
                </tbody>
            </table>
        </>
    )
}