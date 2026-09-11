import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

export const loginUser = async ({username,password})=>{

    //return (userLogin.username === 'admin' && userLogin.password === 'admin')
    try{

        return await axios.post(`${BASE_URL}/login`, {username,password});

    }catch (error){
        throw error;
    }

}