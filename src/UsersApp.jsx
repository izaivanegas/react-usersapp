import {Header} from "./components/Header";
import {UserForm} from "./components/UserForm";
import {UsersList} from "./components/UsersList";
import {useUsers} from './hooks/useUsers.js'

export const UsersApp = () => {

    const {
        users,
        userSelected,
        initialUserForm,
        handlerAddUser,
        handlerRemoveUser,
        handleEditUser
    } = useUsers();

    return (
        <>

            <div className="container my-4">
                <Header/>
                <div className="row">
                    <div className="col">
                        <UserForm
                            handlerAddUser={handlerAddUser}
                            initialUserForm={initialUserForm}
                            userSelected={userSelected}
                        />
                    </div>
                    <div className="col">
                        {users.length === 0 ?
                            <div className="alert alert-warning my-3">
                                No hay usuarios
                            </div>
                            :
                            <UsersList users={users}
                                       handlerRemoveUser={handlerRemoveUser}
                                       handleEditUser={handleEditUser}
                            />
                        }

                    </div>
                </div>
            </div>
        </>
    );

}
