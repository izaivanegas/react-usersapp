import {loginAction, logoutAction} from './LoginActions.js';


export const LoginReducer = (state = [], action) => {
    switch (action.type) {
        case loginAction:
            console.log("LoginReducer here")
            return {
                isAuth: true,
                user: action.payload
            }
        case logoutAction:
            return {
                isAuth: false,
            }
        default:
            return state;
    }
}