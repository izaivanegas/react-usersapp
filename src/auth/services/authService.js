import axios from "axios";
import authApi from "../../apis/authApi.js";



export const loginUser = async ({username,password})=>{

    //return (userLogin.username === 'admin' && userLogin.password === 'admin')
    try{

        return await authApi.post("/login", {username,password});

    }catch (error){
        throw error;
    }

}