
import  {UserRow} from "./UserRow";

export const UsersList = ({users, handlerRemoveUser, handleEditUser}) => {

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
                    <th>remove</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map(({id, username, email, password}) => (
                        <UserRow  key={id} id={id} username={username} email={email}
                                  password={password}
                                  handlerRemoveUser={(id)=>handlerRemoveUser(id)}
                                  handleEditUser = {handleEditUser}
                        />
                    ))

                }
                </tbody>
            </table>
        </>
    )
}