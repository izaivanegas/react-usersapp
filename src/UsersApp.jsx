import {Header} from "./components/Header";
import {UserForm} from "./components/UserForm";
import {UsersList} from "./components/UsersList";
import {useReducer, useState} from "react";
import {usersReducer} from "./reducers/usersReducer";
import {addUser, deleteUser, updateUser} from './reducers/usersActions';

const initialUsers =  [{
    id:1,
    username:'Jose',
    password:'12345',
    email:'izai.vanegas@gmail.com'
},
]


export const UsersApp = () => {

    const [users, dispatch] = useReducer(usersReducer,initialUsers)


const handlerAddUser = (user)=>{
    dispatch({
        type:addUser,
        payload: user
    });

}

const handlerRemoveUser = (id)=>{
    console.log("REMOVE USER REMOVE USER" + id);

    dispatch({
        type:deleteUser,
        payload:id
    })


}

    return (
        <>

            <div className="container my-4">
                <Header />
                <h2>Users App</h2>
                <div className="row">
                    <div className="col">
                        <UserForm
                            handlerAddUser={handlerAddUser}
                        />
                    </div>
                    <div className="col">
                        <UsersList users={users}
                                   handlerRemoveUser={handlerRemoveUser}
                        />
                    </div>
                </div>
            </div>
        </>
    );

}
