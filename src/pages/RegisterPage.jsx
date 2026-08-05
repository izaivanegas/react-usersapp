import {UserForm} from "../components/UserForm.jsx";
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";


export const RegisterPage = () => {

    const {users=[],  initialUserForm} = useContext(UserContext)

    const [userSelected, setUserSelected] = useState(initialUserForm)
    const {id} = useParams() //esto proviene de router-dom

    useEffect(()=>{
        if(id){
            const user = users.find(user => user.id == id)
            if (user){
                setUserSelected(user)
            }else{
                console.log("User not found with ID:" + id)
            }
        }
    },[id])

    return (<div className="container my-4">
            <h4>{userSelected.id>0 ? 'Editar Usuario': 'Registro de usuarios'}</h4>
            <div className="row">
                <div className="col">
                    <UserForm  userSelected={userSelected} />
                </div>
            </div>
        </div>
        )
}