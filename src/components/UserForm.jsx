import {useContext, useEffect, useState} from "react";
import Swal from "sweetalert2";
import {UserContext} from "../context/UserContext.jsx";

export const UserForm = ({userSelected, handleCloseForm}) => {


    const {handlerAddUser, initialUserForm } = useContext(UserContext);

    const [userForm, setUserForm] = useState(initialUserForm);

    const {id, username, password, email} = userForm;


    useEffect(() => {
        console.log("userSelected active", userSelected);
        setUserForm({
            ...userSelected,
        })
    }, [userSelected])

    const onInputChange = ({target}) => {
        const {name, value} = target;
        setUserForm(
            {
                ...userForm,
                [name]: value
            }
        )

    }


    const onSubmit = (event) => {
        //Esto se debe de poner para no actualizar la pagina y no se pierda la inforamcion
        event.preventDefault();

        if (!username || ( id == 0 && !password ) || !email) {
            Swal.fire({
                title: "Error de validación",
                text: "Todos los campos son obligatorios",
                icon: "error"
            });
            return
        }
        if (!email.includes('@')){
            Swal.fire({
                title: "Error de validación",
                text: "El email debe de ser valido",
                icon: "error"
            });
            return
        }
        handlerAddUser(userForm);
        setUserForm(initialUserForm);
    }

    const onCloseForm = () => {
        console.log("CLOSE USER");
        handleCloseForm();
        setUserForm(initialUserForm);
    }

    return (
        <>
            <h3>Formulario de usuario</h3>
            <form onSubmit={onSubmit}>
                <input type="text" className="form-control my-3" placeholder="username" name="username"
                       onChange={onInputChange} value={username}/>

                {id > 0 || <input type="password" className="form-control my-3" placeholder="password" name="password"
                                  onChange={onInputChange} value={password}/>  }

                <input type="email" className="form-control my-3" placeholder="email" name="email"
                       onChange={onInputChange} value={email}/>

                <input type="hidden"
                       name="id"
                       value={id}
                       className="form-control my-3" />

                <button type="submit" className="btn btn-primary">

                    {id > 0 ? 'Editar usuario' : 'Agregar Usuario'}

                </button>

                { !handleCloseForm || <button type="button" className="btn btn-primary mx-3"
                                          onClick={()=>onCloseForm()}

                >Cerrar</button>
                }

            </form>

        </>
    )
}