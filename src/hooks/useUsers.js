import {use, useContext, useReducer, useState} from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {findAll, remove, save, update} from "../service/userService.js";

import {useDispatch, useSelector} from "react-redux";

import {
    initialUserForm,
    errorsInitialUsers,
    addUser,
    removeUser,
    updateUser,
    loadingUsers,
    onUserSelectedForm,
    onHandleOpenForm,
    onHandleCloseForm,
    loadingErrors
} from "../store/slices/users/usersSlice.js"
import {useLogin} from "../auth/hooks/useLogin.js";


const initialUsers = [{
    id: new Date().getTime(),
    username: 'Izai Vanegas',
    password: '12345',
    email: 'izai.vanegas@gmail.com',
    admin: false
},
]



/*const errorsInitialUsers = {
    username: '',
    password: '',
    email: '',
    admin: false,
}*/


export const useUsers = () => {

    const navigate = useNavigate();

    //const {login} = useContext(LoginContext);
    const {login} = useLogin()


    //const [users, dispatch] = useReducer(usersReducer, initialUsers)

    //ahora con redux
    const {users,userSelected,visibleForm,errors} = useSelector(state=>state.users)

    const dispatch = useDispatch()

    //vamos a llevarlo a redux
    //const [userSelected, setUserSelected] = useState(initialUserForm)
    //const [visibleForm, setVisibleForm] = useState(false)


    //const [errors, setErrors] = useState(errorsInitialUsers)

    /**
     * Recuperamos los usuarios del backend usando axios
     * @returns {Promise<void>}
     */
    const getUsers = async () => {
        try{
            const result = await findAll()

            //redux
            dispatch(loadingUsers(result.data))

        }catch (error){
            if(error.response?.status == 401){
                console.log(error.response?.statusText)
            }
        }

    }

    const handlerAddUser = async (user) => {

        if(!login.isAdmin) return

        let respose;

        dispatch(loadingErrors(errorsInitialUsers))

        //setErrors(errorsInitialUsers)


        try {

            if (user !== null && user.id !== undefined) {
                if (user.id === 0) {
                    respose = await save(user);
                    dispatch(addUser(respose.data.data))
                    Swal.fire(
                        'Agregar usuario',
                        'Usuario creado con exito',
                        'success'
                    )
                    navigate('/users')
                    handleCloseForm()
                } else {
                    //actualizacion por que es dif de cero
                    respose = await update(user)
                    dispatch(updateUser(respose.data.data))
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

                dispatch(loadingErrors(errorData.data))
                //setErrors(errorData.data)




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
                dispatch(removeUser(id))
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
    //se paso al redux con el nombre onUserSelectedForm
    const handleEditUser = (user) => {
        console.log("Edit USER" + user.id)
        console.log("username: " + user.username)
        console.log("username: " + user.admin)
        /*setVisibleForm(true)
        setUserSelected({
            ...user,

        })*/
        dispatch(onUserSelectedForm({...user}))

        //setErrors(errorsInitialUsers)
        dispatch(loadingErrors(errorsInitialUsers))
    }
    const handleOpenForm = () => {
        //setVisibleForm(true)
        dispatch(onHandleOpenForm())

        //setErrors(errorsInitialUsers)
        dispatch(loadingErrors(errorsInitialUsers))
    }
    const handleCloseForm = () => {
        //setVisibleForm(false)
        //setUserSelected(initialUserForm)

        dispatch(onHandleCloseForm())

         //setErrors({})
        dispatch(loadingErrors({}))
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