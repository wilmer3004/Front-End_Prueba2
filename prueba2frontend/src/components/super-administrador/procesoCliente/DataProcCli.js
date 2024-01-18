import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/procesoCli';
const authToken = Cookies.get('authToken');
const headers = {
    'Authorization': `Bearer ${authToken}`
};
const useDataServiceProCli = () => {
    const [procesoCli, setProcesoCli] = useState([]);
 
    const fetchDataProCli = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });
 
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
 
            setProcesoCli(response.data);
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
            fetchDataProCli();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
    const postHttp = async (procesoCli) => {
        try {
            const dataRequest = {
                "descripProcesoCliente": procesoCli.descripPro,
                "fechaProcesoCliente": procesoCli.fechaProCli,
                "estadoProcesoCliente": procesoCli.estadoProcCli,
                "idClienteFk": procesoCli.clienteProcCli,
                "idUsuFK2": procesoCli.empleadoProcCli,
            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            fetchDataProCli();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
 
 
    useEffect(() => {
        fetchDataProCli();
    }, []);
 
    return { procesoCli, fetchDataProCli, postHttp, updateState };
 };
 

export default useDataServiceProCli;