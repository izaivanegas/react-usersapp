import {addUser, deleteUser, updateUser} from './usersActions';


export const usersReducer = (state = [], action) => {

    switch(action.type){
        case addUser:
            return [...state,
                {
                    ...action.payload,
                    id: new Date().getTime(), //Se debe de considerar un id unico, en las facturas controlabamos un counter

                }
            ]
        case deleteUser:
            return[
                ...state.filter((user)=>user.id !== action.payload)
            ]
        default:
            return state;

    }





}