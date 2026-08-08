import {useUsers} from "../hooks/useUsers.js";
import {UserModalForm} from "../components/UserModalForm.jsx";

import {UsersList} from "../components/UsersList.jsx";
import {useContext, useEffect} from "react";
import {UserContext} from "../context/UserContext.jsx";

export const UsersPage = ()=>{


    const {
        users,
        visibleForm,
        handlerRemoveUser,
        handleEditUser,
        handleOpenForm,
        getUsers
    } = useContext(UserContext)

    //para ejecutar la funcion getUsers
    useEffect(()=>{
        getUsers()
    }, [])



    return (
        <>
            {!visibleForm ||
                <UserModalForm />
            }
            <div className="container my-4">
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

                            />
                        }
                    </div>
                </div>
            </div>
        </>
    )

}