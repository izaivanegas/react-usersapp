import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const loginUser = async ({username,password})=>{

    //return (userLogin.username === 'admin' && userLogin.password === 'admin')
    try{

        return await axios.post(`${BASE_URL}/login`, {username,password});

    }catch (error){
        throw error;
    }

}