import {UserForm} from "./UserForm.jsx";


export const UserModalForm = ({userSelected, handlerAddUser,initialUserForm,handleCloseForm}) => {

    return (
        <div className="abrir-modal fadeIn">
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
    )


}