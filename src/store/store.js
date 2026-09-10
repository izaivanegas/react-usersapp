import {configureStore} from "@reduxjs/toolkit";
import {usersSlice} from "./slices/users/usersSlice.js";
import {loginSlice} from "./slices/login/loginSlice.js";


export const store = configureStore({
    reducer:{
        users: usersSlice.reducer,
        login: loginSlice.reducer,
    }
})