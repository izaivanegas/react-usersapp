import {UserForm} from "./UserForm.jsx";
import {useContext} from "react";
import {UserContext} from "../context/UserContext.jsx";


export const UserModalForm = () => {

    const {userSelected,handleCloseForm} = useContext(UserContext)

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