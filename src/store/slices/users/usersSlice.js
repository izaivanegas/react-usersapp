import {createSlice} from "@reduxjs/toolkit";

export const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin:false,
}

export const errorsInitialUsers = {
    username: '',
    password: '',
    email: '',
    admin: false,
}


export const usersSlice = createSlice({
    name: "users",
    initialState:{
        users:[],
        userSelected: initialUserForm,
        visibleForm: false,
        errors:errorsInitialUsers,
        isLoading: true,

    },
    reducers: {
        addUser:(state, action)=>{
            state.users = [
                ...state.users,
                {...action.payload,}
            ]
            state.userSelected = initialUserForm
            state.visibleForm = false
        },
        removeUser:(state, action)=>{
            state.users = state.users.filter(user=>user.id !== action.payload)
        },
        updateUser:(state, action) =>{
            state.users = state.users.map(user=>{
                if(Number(user.id) === Number(action.payload.id))
                {
                   return {
                       ...action.payload,
                       password: user.password
                   }
                }
                return user
            })
        },
        loadingUsers:(state,action)=>{
            state.users = action.payload
            state.isLoading = false
        }
        ,
        onUserSelectedForm:(state,action) =>{
            state.userSelected = action.payload
            state.visibleForm = true
        },
        onHandleOpenForm:(state)=>{
            state.visibleForm = true
        },
        onHandleCloseForm:(state)=>{
            state.visibleForm = false
            state.userSelected = initialUserForm
        },
        //se puede desestructurar action = {payload}
        loadingErrors:(state,{payload})=>{
            state.errors = payload
        }
    }
})

export const {addUser,
    removeUser,
    updateUser,
    loadingUsers,
    onUserSelectedForm,
    onHandleOpenForm
    ,onHandleCloseForm,
    loadingErrors} = usersSlice.actions;