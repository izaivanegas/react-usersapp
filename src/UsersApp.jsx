import {Header} from "./components/Header";
import {UserForm} from "./components/UserForm";
import {UsersList} from "./components/UsersList";
import {useUsers} from './hooks/useUsers.js'
import {UserModalForm} from "./components/UserModalForm";

export const UsersApp = () => {

    const {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handleEditUser,
        handleCloseForm,
        handleOpenForm
    } = useUsers();

    return (
        <>
            {!visibleForm ||
                <UserModalForm
                    userSelected={userSelected}
                    handlerAddUser={handlerAddUser}
                    initialUserForm={initialUserForm}
                    handleCloseForm={handleCloseForm}/>
            }
            <div className="container my-4">
                <Header/>
                <div className="row">
                    <div className="col">
                        {visibleForm ||
                            <button
                                className="btn btn-primary my-3"
                                type="button"
                                onClick={handleOpenForm}>
                                Nuevo usuario
                            </button>}

                        {users.length === 0 ?
                            <div className="alert alert-warning my-3">No hay usuarios</div>
                            :
                            <UsersList
                                users={users}
                                handlerRemoveUser={handlerRemoveUser}
                                handleEditUser={handleEditUser}/>
                        }
                    </div>
                </div>
            </div>
        </>
    );

}
