import {use, useReducer, useState} from "react";
import {usersReducer} from "../reducers/usersReducer.js";
import {addUser, deleteUser, updateUser, loadingUsers} from '../reducers/usersActions';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {findAll, remove, save, update} from "../service/userService.js";

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

    const navigate = useNavigate();

    const [users, dispatch] = useReducer(usersReducer,initialUsers)
    const [userSelected, setUserSelected] = useState(initialUserForm)
    const [visibleForm, setVisibleForm] = useState(false)

    /**
     * Recuperamos los usuarios del backend usando axios
     * @returns {Promise<void>}
     */
    const getUsers = async () =>{
        const result = await findAll()
        //console.log(result)
        dispatch(
            {
                type:loadingUsers,
                payload:result.data
            }
        )
    }

    const handlerAddUser = async (user)=>{
        let respose;
        if(user !== null && user.id !== undefined ){
            if(user.id === 0 ){
                console.log("handlerAddUser: se agrega un usuario....")

                respose = await save(user);


                dispatch({
                    type:addUser,
                    payload: respose.data.data
                });

                Swal.fire(
                    'Agregar usuario',
                    'Usuario creado con exito',
                    'success'
                )
                navigate('/users')
            }else{
                //actualizacion por que es dif de cero
                console.log("se realizara la actualizacion del usuaio id: "+user.id)
                respose = await update(user)
                dispatch({
                    type:updateUser,
                    payload:respose.data.data
                })
                Swal.fire(
                    'Actualizacion de informacion',
                    'Usuario actualizado con exito',
                    'success'
                )
                navigate('/users')
            }
        }else{
            console.log("problema con el procesamiento de usuario")
        }
        handleCloseForm()
    }

    const handlerRemoveUser = (id)=>{
        console.log("REMOVE USER REMOVE USER" + id);


        Swal.fire({
            title: "Estas seguro de eliminar?",
            text: "Una vez aliminado no hay forma de revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
        }).then((result) => {
            if (result.isConfirmed){
                remove(id)
                dispatch({
                    type:deleteUser,
                    payload:id
                })
                Swal.fire({
                    title: "Eliminar cuenta!",
                    text: "Usuario eliminado con exito.",
                    icon: "success"
                });
                navigate('/users')
            }
        });






    }

    const handleEditUser = (user)=>{
        console.log("REMOVE USER REMOVE USER" + user.id)
        console.log("username: "+ user.username)
        setVisibleForm(true)
        setUserSelected({
            ...user,

        })
    }
    const handleOpenForm = () =>{
        setVisibleForm(true)
    }
    const handleCloseForm = () =>{
        setVisibleForm(false)
        setUserSelected(initialUserForm)
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handleEditUser,
        handleOpenForm,
        handleCloseForm,
        getUsers
    }

}