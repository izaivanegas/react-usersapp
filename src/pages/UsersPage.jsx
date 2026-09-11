import {useUsers} from "../hooks/useUsers.js";
import {UserModalForm} from "../components/UserModalForm.jsx";
import {UsersList} from "../components/UsersList.jsx";
import {useContext, useEffect} from "react";
//import {UserContext} from "../context/UserContext.jsx";

import {useLogin} from "../auth/hooks/useLogin.js";

export const UsersPage = ()=>{


    const {
        users,
        visibleForm,
        handlerRemoveUser,
        handleEditUser,
        handleOpenForm,
        getUsers,
        isLoading,
    } = useUsers()


    //const {login} = useContext(LoginContext);
    const {login} = useLogin();

    //para ejecutar la funcion getUsers
    useEffect(()=>{
        getUsers()
    }, [])


    if(isLoading){
        return <div className="container my-4">

            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>

        </div>
    }
    return (
        <>
            {!visibleForm ||
                <UserModalForm/>
            }
            <div className="container my-4">
                <div className="row">
                    <div className="col">
                        {visibleForm || !(login.isAdmin) ||
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