import axios from "axios";


export const findAll = async ()=>{

    try{
        const response = axios.get("http://localhost:8080/users")
        return response
    }
    catch(e){
        console.error(e)
    }
    return null
}