import {addUser, deleteUser, updateUser} from '../actions/UsersActions';


export const usersReducer = (state = [], action) => {


    switch(action.type){
        case addUser:


            return [...state,
                {
                    ...action.payload,
                    id: new Date().getTime(), //Se debe de considerar un id unico, en las facturas controlabamos un counter

                }
            ]
        default: state;

    }





}