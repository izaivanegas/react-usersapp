import {createSlice} from "@reduxjs/toolkit";


const initialLoginUser = JSON.parse(sessionStorage.getItem('login'))|| {
    isAuth: false,
    user: {
        username: "",
        password: "",
    },
    isAdmin: false
}


export const loginSlice = createSlice({

    name: "login",
    initialState: initialLoginUser,
    reducers:{
        onLogin:(state, action)=>{
            state.isAuth = true
            state.isAdmin =  action.payload.isAdmin
            state.user = action.payload.user
        },
        onLogout:(state)=>{
            state.isAuth = false
            state.isAdmin = false
            state.user = null
        }
    }

})


export const {onLogin, onLogout} = loginSlice.actions