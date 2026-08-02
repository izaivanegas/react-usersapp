import {Header} from "./components/Header";
import {UserForm} from "./components/UserForm";
import {UsersList} from "./components/UsersList";
import {useUsers} from './hooks/useUsers.js'

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

            { !visibleForm || <div className="abrir-modal fadeIn">
                <div className="modal" style={{display:"block"}} tabIndex="-1">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" >
                                    {userSelected.id >0 ? 'Editar': 'Crear'} Modal Usuarios
                                </h5>
                            </div>
                            <div className="modal-body">
                                <UserForm
                                    handlerAddUser={handlerAddUser}
                                    initialUserForm={initialUserForm}
                                    userSelected={userSelected}
                                    handleCloseForm={handleCloseForm}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }

            <div className="container my-4">
                <Header/>
                <div className="row">



                    <div className="col">

                        { visibleForm || <button className="btn btn-primary my-3" type="button"
                        onClick={handleOpenForm}
                        >
                            Nuevo usuario
                        </button> }


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
