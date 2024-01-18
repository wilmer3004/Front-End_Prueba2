import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/cliente';
const authToken = Cookies.get('authToken');
const headers = {
    'Authorization': `Bearer ${authToken}`
};
const useDataServiceCliente = () => {
    const [clientes, setClientes] = useState([]);
 
    const fetchDataCliente = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });
 
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
 
            setClientes(response.data);
        } catch (error) {
            console.error('Request failed:', error.message);
        }
    };
    const updateState = async (id) => {
        try {

            const response = await axios.delete(`${apiURL}/${id}`, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            fetchDataCliente();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }

        
    };
    const postHttp = async (clientes) => {
        try {
            const dataRequest = {
                "pNombreCliente": clientes.pNombreCli,
                "sNombreCliente": clientes.sNombreCli,
                "pApellidoCliente": clientes.pApellidoCli,
                "sApellidoCliente": clientes.sApellidoCli,
                "numIdentCliente": clientes.numDocCli,
                "telefonoCliente": clientes.telefonoCli,
                "correoCliente": clientes.usernameCli,
                "estadoCliente": clientes.estadoCli,
                "idCiudadFK": clientes.ciudadCli,
                "idTipoDocFK": clientes.TipoDocCli,
            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            fetchDataCliente();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
 
    useEffect(() => {
        fetchDataCliente();
    }, []);
 
    return { clientes, fetchDataCliente, updateState, postHttp };
 };
 

export default useDataServiceCliente;