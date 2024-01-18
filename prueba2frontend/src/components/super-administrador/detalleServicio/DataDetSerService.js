import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/detalleSer';
const authToken = Cookies.get('authToken');
const headers = {
    'Authorization': `Bearer ${authToken}`
};
const useDataServiceDetSer = () => {
    const [detalleSer, setDetalleSer] = useState([]);
 
    const fetchDataDetSer = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });
 
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
 
            setDetalleSer(response.data);
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
            fetchDataDetSer();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
    const postHttp = async (detalleSer) => {
        try {
            const dataRequest = {
                "fechaInicioServicio": detalleSer.fechaIniDetalleSer,
                "fechaFinServicio": detalleSer.fechaFinDetalleSer,
                "estadoPagoServicio": detalleSer.estadoPagoDetSer,
                "estadoDetalleServicio": detalleSer.estadoDetSer,
                "idClienteFK": detalleSer.clienteDetSer,
                "idServicioFK": detalleSer.servicioDetSer
            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            fetchDataDetSer();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
 

    useEffect(() => {
        fetchDataDetSer();
    }, []);
 
    return { detalleSer, fetchDataDetSer, postHttp, updateState };
 };
 

export default useDataServiceDetSer;