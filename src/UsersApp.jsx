import {Header} from "./components/Header";
import {UserForm} from "./components/UserForm";
import {UsersList} from "./components/UsersList";
import {useState} from "react";



export const UsersApp = () => {

   const [usersList, setUsersList] = useState(initialUsers)


const handlerAddUser = (user)=>{

    console.log(user);
    setUsersList(
        [...usersList, user]
    )

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
                        <UsersList users={usersList}

                        />
                    </div>
                </div>
            </div>
        </>
    );

}
