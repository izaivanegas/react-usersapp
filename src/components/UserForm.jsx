import {useState} from "react";


const initialUserForm = {
    username: '',
    password: '',
    email: '',
}

export const UserForm = ({handlerAddUser}) => {

    const [userForm, setUserForm] = useState(initialUserForm);

    const {username, password, email} = userForm;


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
        if(!username || !password || !email){
            alert("Todos los campos son obligatorios")
            return
        }

            handlerAddUser(userForm);
            setUserForm(initialUserForm);
        }


    return (
        <>
            <h3>Formulario de usuario</h3>
            <form onSubmit={onSubmit}>
                <input type="text" className="form-control my-3" placeholder="username" name="username"
                       onChange={onInputChange} value={username}/>
                <input type="password" className="form-control my-3" placeholder="password" name="password"
                       onChange={onInputChange} value={password}/>
                <input type="email" className="form-control my-3" placeholder="email" name="email"
                       onChange={onInputChange} value={email}/>
                <button type="submit" className="btn btn-primary">Agregar usuario</button>
            </form>

        </>
    )
}