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
    console.log("save.......")
    try{
       const response =   await axios.post(BASE_URL+"/adduser",
            {username, password, email})

        return response
    }catch (error){
        console.error("Error en save:", error);

        if (error.response) {
            // El servidor respondió con un error
            console.log("Código de estado:", error.response.status);
            console.log("Datos del error:", error.response.data);
            console.log("Mensaje:", error.response.data.message);
            console.log("Detalles de validación:", error.response.data.data);
        } else if (error.request) {
            console.log("No hubo respuesta del servidor");
        } else {
            console.log("Error en la configuración:", error.message);
        }

        //Re-lanzar el error con información adicional
        throw error;
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
        const response =   await axios.put(BASE_URL+"/"+id,{username, email})
        return response

    }
    catch(error){
        console.error("Error en update:", error);

        if (error.response) {
            // El servidor respondió con un error
            console.log("Código de estado:", error.response.status);
            console.log("Datos del error:", error.response.data);
            console.log("Mensaje:", error.response.data.message);
            console.log("Detalles de validación:", error.response.data.data);
        } else if (error.request) {
            console.log("No hubo respuesta del servidor");
        } else {
            console.log("Error en la configuración:", error.message);
        }

        throw error;
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