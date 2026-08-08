import {UserContext} from "./UserContext.jsx";
import {useUsers} from "../hooks/useUsers.js";


export const UserProvider = ({children}) => {

    const {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handleEditUser,
        handleCloseForm,
        handleOpenForm,
        getUsers
    } = useUsers();



    return (
        <UserContext.Provider value={{
            users,
            userSelected,
            initialUserForm,
            visibleForm,
            handlerAddUser,
            handlerRemoveUser,
            handleEditUser,
            handleCloseForm,
            handleOpenForm,
            getUsers
        }}>
            {children}
        </UserContext.Provider>
    )
}