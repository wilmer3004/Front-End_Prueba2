import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/procesoCom';

const useDataServiceProcComp = () => {
    const [ProcComp, setProcComp] = useState([]);
    const authToken = Cookies.get('authToken');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };

    const fetchDataProcComp = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });
 
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
 
            setProcComp(response.data);
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
            fetchDataProcComp();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
    const postHttp = async (procesoCli) => {
        try {
            const dataRequest = {
                "codAprobCompania": procesoCli.codVer,
                "fechaEnvioCod": procesoCli.fechaPC,
                "estadoProcesoComp": procesoCli.estadoProcComp,
                "idCompaniaFK": procesoCli.compañiaProcComp,
                "idUsuFK": procesoCli.administradorProcComp,
            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            fetchDataProcComp();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
 
    useEffect(() => {
        fetchDataProcComp();
    }, []);
 
    return { ProcComp, fetchDataProcComp, postHttp, updateState };
 };
 

export default useDataServiceProcComp;
