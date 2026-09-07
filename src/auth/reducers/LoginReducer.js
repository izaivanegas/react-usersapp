import {loginAction, logoutAction} from './LoginActions.js';


export const LoginReducer = (state = [], action) => {
    switch (action.type) {
        case loginAction:
            console.log("LoginReducer here")
            return {
                isAuth: true,
                isAdmin: action.payload.isAdmin,
                user: action.payload.user,
            }
        case logoutAction:
            return {
                isAuth: false,
                isAdmin: false,
                user: null,
            }
        default:
            return state;
    }
}