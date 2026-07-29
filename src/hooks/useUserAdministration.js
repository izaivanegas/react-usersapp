import {useReducer} from "react";
import {usersReducer} from '../reducers/usersReducer';



const initialUsers =  [{
    id:1,
    username:'Jose',
    password:'12345',
    email:'izai.vanegas@gmail.com'
},
]

export const useUserAdministration = () => {

    const [users, dispatch] = useReducer(usersReducer,initialUsers)


    /**
     * Se debera de tratar la accion de agregar
     * @param user
     */
    const handleAddUser = (user) =>{
        console.log("HandleAddUSer............")

    }
}