import {use, useReducer, useState} from "react";
import {usersReducer} from "../reducers/usersReducer.js";
import {addUser, deleteUser, updateUser} from '../reducers/usersActions';


const initialUsers =  [{
    id: new Date().getTime(),
    username:'Izai Vanegas',
    password:'12345',
    email:'izai.vanegas@gmail.com'
},
]


const initialUserForm = {
    id:0,
    username: '',
    password: '',
    email: '',
}


export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducer,initialUsers)
    const [userSelected, setUserSelected] = useState(initialUserForm)

    const handlerAddUser = (user)=>{
        if(user !== null && user.id !== undefined ){
            if(user.id === 0 ){
                console.log("se agrega")
                dispatch({
                    type:addUser,
                    payload: user
                });
            }else{
                //actualizacion por que es dif de cero
                console.log("se actualiza")
                console.log("se recibe id:" + user.id)
                dispatch({
                    type:updateUser,
                    payload:user
                })
            }
        }else{
            console.log("problema con el procesamiento de usuario")
        }

    }

    const handlerRemoveUser = (id)=>{
        console.log("REMOVE USER REMOVE USER" + id);

        dispatch({
            type:deleteUser,
            payload:id
        })


    }

    const handleEditUser = (user)=>{
        console.log("REMOVE USER REMOVE USER" + user.id)
        console.log("username: "+ user.username)

        setUserSelected({
            ...user,

        })
        /*if(user !== null){
            dispatch({
                type:updateUser,
                payload:user
            })
        }else{
            alert("Problem editing user");
        }
    */
    }
    return {
        users,
        userSelected,
        initialUserForm,
        handlerAddUser,
        handlerRemoveUser,
        handleEditUser
    }


}