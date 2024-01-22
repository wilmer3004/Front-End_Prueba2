import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/detalleSerCom';

const useDataServiceDetSerCom = () => {
    const [detalleSerCom, setDetalleSerCom] = useState([]);
    const authToken = Cookies.get('authToken');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };

    const fetchDataDetSerCom = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });
 
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
 
            setDetalleSerCom(response.data);
        } catch (error) {
            console.error('Request failed:', error.message);
        }
    };

    const postHttp = async (detalleSerCom) => {
        try {
            const dataRequest = {
                "idCompaniaFK": detalleSerCom.idCompaniaFK,
                "idServicioFK": detalleSerCom.idServicioFK
            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            fetchDataDetSerCom();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
 
    useEffect(() => {
        fetchDataDetSerCom();
    }, []);
 
    return { detalleSerCom, fetchDataDetSerCom, postHttp };
 };
 

export default useDataServiceDetSerCom;