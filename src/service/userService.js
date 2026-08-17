import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const findAll = async ()=>{

    try{
        const response = await axios.get(BASE_URL+"/users")
        // response.data = {
        //   success: true,
        //   message: "Usuarios obtenidos exitosamente",
        //   statusCode: 200,
        //   data: [{id:1, username:"izai"}, ...],  // Los datos están aquí
        //   errors: null
        // }
        return response.data
    }
    catch(e){
        console.error(e)
    }
    return null
}

/**
 * Funcion para poder crear un usuario
 * @param username
 * @param password
 * @param email
 * @returns {Promise<void>}
 */
export const save =  async ({username, password, email})=>{

    try{
       return  await axios.post(BASE_URL+"/adduser",
            {username, password, email})

    }catch (e){
        console.error(e)
    }
    return undefined
}

/**
 * Funcion para realizar una actualizacion de informacion de un usuario
 * usando el id
 * @param id
 * @param username
 * @param email
 * @returns {Promise<undefined|void>}
 */
export const update = async ({id, username, email})=>{
    try{
        return  await axios.put(BASE_URL+"/"+id,{username, email})

    }
    catch(e){
        console.error(e)
    }
    return undefined
}
/**
 * Funcion para eliminar un usuario usando el id
 * @param id
 * @returns {Promise<undefined>}
 */
export const remove = async ({id})=>{
    try{
         await axios.delete(BASE_URL+"/"+id)

    }
    catch(e){
        console.error(e)
    }
    return undefined
}