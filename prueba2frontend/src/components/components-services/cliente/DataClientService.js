import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/cliente';

const useDataServiceCliente = () => {
    const [clientes, setClientes] = useState([]);
    const [clientesByID,setClientesByID] = useState([]);
    const authToken = Cookies.get('authToken');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };
 
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

    const fetchDataByID = async (id) => {
        try {
            const response = await axios.get(`${apiURL}/${id}`, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            setClientesByID(response.data);
            return response.data;
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };

    const postHttp = async (clientes) => {
        try {
            const dataRequest = {
                "idCliente": clientes.idCliente,
                "pnombreCliente": clientes.pNombreCli,
                "snombreCliente": clientes.sNombreCli,
                "papellidoCliente": clientes.pApellidoCli,
                "sapellidoCliente": clientes.sApellidoCli,
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
 
    return { clientes, fetchDataCliente, updateState, postHttp, fetchDataByID, clientesByID  };
 };
 

export default useDataServiceCliente;