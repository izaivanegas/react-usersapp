    import axios from "axios";


    const BASE_URL = "http://localhost:8080";


    const config = ()=> {
        return {
            headers:{
                "Authorization": sessionStorage.getItem('token'),
                "Content-Type": "application/json",
            }
        }
    }

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
    export const save =  async ({username, password, email, admin})=>{
        console.log("save.......")
        console.log("admin--<:"+admin)
        try{
           const response =   await axios.post(BASE_URL+"/adduser",
                {username, password, email, admin}, config())

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
    export const update = async ({id, username, email, admin})=>{
        try{
            const response =   await axios.put(BASE_URL+"/"+id,{username, email, admin},config())
            return response

        }
        catch(error){
            if (error.response) {
                // El servidor respondió con un error
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
    export const remove = async (id)=>{
        try{
             await axios.delete(BASE_URL+"/"+id, config())

        }
        catch(e){
            console.error(e)
        }
        return undefined
    }