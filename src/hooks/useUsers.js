import {use, useContext, useReducer, useState} from "react";
import {usersReducer} from "../reducers/usersReducer.js";
import {addUser, deleteUser, updateUser, loadingUsers} from '../reducers/usersActions';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {findAll, remove, save, update} from "../service/userService.js";
import {LoginContext} from "../auth/context/LoginContext.jsx";

const initialUsers = [{
    id: new Date().getTime(),
    username: 'Izai Vanegas',
    password: '12345',
    email: 'izai.vanegas@gmail.com'
},
]


const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
}

const errorsInitialUsers = {
    username: '',
    password: '',
    email: '',
}


export const useUsers = () => {

    const navigate = useNavigate();

    const {login} = useContext(LoginContext);

    const [users, dispatch] = useReducer(usersReducer, initialUsers)
    const [userSelected, setUserSelected] = useState(initialUserForm)
    const [visibleForm, setVisibleForm] = useState(false)
    const [errors, setErrors] = useState(errorsInitialUsers)

    /**
     * Recuperamos los usuarios del backend usando axios
     * @returns {Promise<void>}
     */
    const getUsers = async () => {
        const result = await findAll()
        //console.log(result)
        dispatch(
            {
                type: loadingUsers,
                payload: result.data
            }
        )
    }

    const handlerAddUser = async (user) => {

        if(!login.isAdmin) return

        let respose;
        setErrors(errorsInitialUsers)
        try {

            if (user !== null && user.id !== undefined) {
                if (user.id === 0) {
                    console.log("handlerAddUser: se agrega un usuario....")

                    respose = await save(user);
                    console.log("Respuesta: " + JSON.stringify(respose));

                    dispatch({
                        type: addUser,
                        payload: respose.data.data
                    });

                    Swal.fire(
                        'Agregar usuario',
                        'Usuario creado con exito',
                        'success'
                    )
                    navigate('/users')
                    handleCloseForm()
                } else {
                    //actualizacion por que es dif de cero
                    console.log("se realizara la actualizacion del usuaio id: " + user.id)
                    respose = await update(user)
                    dispatch({
                        type: updateUser,
                        payload: respose.data.data
                    })
                    Swal.fire(
                        'Actualizacion de informacion',
                        'Usuario actualizado con exito',
                        'success'
                    )
                    navigate('/users')
                    handleCloseForm()
                }
            } else {
                console.log("problema con el procesamiento de usuario")
            }

        } catch (error) {
            console.log("Error caemos aqui:"+error.response.status)
            //Error
            if (error.response && error.response.status ==400 && error.response.data) {
                console.log("Esto es un error en el  error response")
                const errorData = error.response.data;

                // se agregan los errores
                setErrors(errorData.data)
                console.log("Estoy aqui::::::.->" + JSON.stringify(errorData.data))

                if (errorData.data && typeof errorData.data === 'object') {
                    // Si hay errores de validación, los mostramos
                    const validationErrors = Object.values(errorData.data).join('. ');
                    Swal.fire(
                        'Error de validación',
                        validationErrors || 'Por favor, verifica los datos ingresados',
                        'error'
                    );
                } else {
                    // Si solo hay un mensaje de error general
                    Swal.fire(
                        'Error',
                        errorData.message || 'Ocurrió un error al procesar la solicitud',
                        'error'
                    );
                }
            } else if (error.response && error.response.status ==403 ){
                console.log("Esto es un error de permisos")
                Swal.fire(
                    'Error de validación',
                    'No tienes los permisos para realizar esta accion',
                    'error'
                );
            } else if (error.response && error.response.status == 401 ){
                // Para poder hacer el tema del token
                han



            }else {
                Swal.fire(
                    'Error',
                    'No se pudo conectar con el servidor',
                    'error'
                );
            }
        }

    }

    const handlerRemoveUser = (id) => {
        if(!login.isAdmin) return
        console.log("REMOVE USER REMOVE USER" + id);
        try{
            Swal.fire({
            title: "Estas seguro de eliminar?",
            text: "Una vez aliminado no hay forma de revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                remove(id)
                dispatch({
                    type: deleteUser,
                    payload: id
                })
                Swal.fire({
                    title: "Eliminar cuenta!",
                    text: "Usuario eliminado con exito.",
                    icon: "success"
                });
                navigate('/users')
            }
        });}
        catch (error) {
            //Error
            console.log("Error en el handle: "  +  error)
            console.log(error)
            if (error.response && error.response.data) {
                console.log("Esto es un error en el  error response")
                const errorData = error.response.data;

                if (errorData.data && typeof errorData.data === 'object') {
                    // Si hay errores de validación, los mostramos
                    const validationErrors = Object.values(errorData.data).join('. ');
                    Swal.fire(
                        'Error de validación',
                        validationErrors || 'Por favor, verifica los datos ingresados',
                        'error'
                    );
                } else {
                    // Si solo hay un mensaje de error general
                    Swal.fire(
                        'Error',
                        errorData.message || 'Ocurrió un error al procesar la solicitud',
                        'error'
                    );
                }
            } else {
                Swal.fire(
                    'Error',
                    'No se pudo conectar con el servidor',
                    'error'
                );
            }


        }



    }

    const handleEditUser = (user) => {
        console.log("Edit USER" + user.id)
        console.log("username: " + user.username)
        setVisibleForm(true)
        setUserSelected({
            ...user,

        })
        setErrors(errorsInitialUsers)
    }
    const handleOpenForm = () => {
        setVisibleForm(true)
        setErrors(errorsInitialUsers)
    }
    const handleCloseForm = () => {
        setVisibleForm(false)
        setUserSelected(initialUserForm)
        setErrors(errorsInitialUsers)
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        handlerAddUser,
        handlerRemoveUser,
        handleEditUser,
        handleOpenForm,
        handleCloseForm,
        getUsers
    }

}