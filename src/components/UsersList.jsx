
import  {UserRow} from "./UserRow";
import {useContext} from "react";
import {UserContext} from "../context/UserContext.jsx";

export const UsersList = () => {


    const {users} = useContext(UserContext)

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
                    <th>update</th>
                    <th>update route</th>
                    <th>remove</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map(({id, username, email, password}) => (
                        <UserRow  key={id} id={id} username={username} email={email}
                                  password={password}

                        />
                    ))

                }
                </tbody>
            </table>
        </>
    )
}