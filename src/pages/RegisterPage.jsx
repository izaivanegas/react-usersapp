import {UserForm} from "../components/UserForm.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


export const RegisterPage = ({users=[], handlerAddUser, initialUserForm}) => {

    const [userSelected, setUserSelected] = useState(initialUserForm)
    const {id} = useParams() //esto proviene de router-dom

    useEffect(()=>{
        const user = users.find(user => user.id == id)
        if (user){
            setUserSelected(user)
        }else{
            console.log("User not found with ID:" + id)
        }
    },[id])

    return (<div className="container my-4">
            <h4>{userSelected.id>0 ? 'Editar Usuario': 'Registro de usuarios'}</h4>
            <div className="row">
                <div className="col">
                    <UserForm
                        handlerAddUser={handlerAddUser}
                        initialUserForm={initialUserForm}
                        userSelected={userSelected}
                        handleCloseForm={undefined}
                          />
                </div>
            </div>
        </div>
        )
}