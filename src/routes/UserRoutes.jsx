import {Navigate, Route, Routes} from "react-router-dom";
import {UsersPage} from "../pages/UsersPage.jsx";
import {Navbar} from "../layout/Navbar.jsx";
import {RegisterPage} from "../pages/RegisterPage.jsx";
import {useUsers} from "../hooks/useUsers.js";


export const UserRoutes = ({login, handleLogout})=>{

    const {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handleEditUser,
        handleCloseForm,
        handleOpenForm
    } = useUsers();

    return (<>

        <Navbar login={login}  handleLogout={handleLogout} />
        <Routes>
            <Route path="users" element={<UsersPage
                users={users}
                userSelected ={userSelected}
                initialUserForm ={initialUserForm}
                visibleForm ={visibleForm}
                handlerAddUser ={handlerAddUser}
                handlerRemoveUser ={handlerRemoveUser}
                handleEditUser ={handleEditUser}
                handleCloseForm ={handleCloseForm}
                handleOpenForm ={handleOpenForm}


            />} />
            <Route path="/users/register" element={<RegisterPage  handlerAddUser = {handlerAddUser}
                                                                  initialUserForm = {initialUserForm} />} />

            <Route path="/users/edit/:id" element={<RegisterPage
                users={users}
                handlerAddUser = {handlerAddUser}
                initialUserForm = {initialUserForm} />} />


            <Route path="/" element={<Navigate to="/users" />} />


        </Routes>
    </>)
}