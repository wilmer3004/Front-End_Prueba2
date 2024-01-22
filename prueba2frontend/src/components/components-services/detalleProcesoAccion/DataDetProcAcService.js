import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/detalleProcAc';

const useDataServiceDetProcAcc = () => {
    const [detalleProcAc, setDetalleProcAc] = useState([]);
    const authToken = Cookies.get('authToken');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };
    const fetchDataDetProAcc = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });
 
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
 
            setDetalleProcAc(response.data);
        } catch (error) {
            console.error('Request failed:', error.message);
        }
    };
    const postHttp = async (detalleProcAc) => {
        try {
            const dataRequest = {
                "idAccionFK": detalleProcAc.idAccionFK,
                "idProcesoClienteFK": detalleProcAc.idProcesoClienteFK
            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            fetchDataDetProAcc();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
 
    useEffect(() => {
        fetchDataDetProAcc();
    }, []);
 
    return { detalleProcAc, fetchDataDetProAcc, postHttp };
 };
 

export default useDataServiceDetProcAcc;