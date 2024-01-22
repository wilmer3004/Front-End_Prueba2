import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/detalleUsuTar';

const useDataServiceDetUsuTar = () => {
    const [detalleUsuTar, setDetalleUsuTar] = useState([]);
    const authToken = Cookies.get('authToken');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };

    const fetchDataDetUsuTar = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });
 
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
 
            setDetalleUsuTar(response.data);
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
            fetchDataDetUsuTar();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
    const postHttp = async (detalleUsuTar) => {
        try {
            const dataRequest = {
                "fechaAsigTarea": detalleUsuTar.fechaAsigDetTa,
                "fechaFinTarea": detalleUsuTar.fechaFinDetTa,
                "estadoDetalleUsuTarea": detalleUsuTar.estadoDetTar,
                "idUsuEmpleadoFK": detalleUsuTar.empleadoDetTarea,
                "idTareaFK": detalleUsuTar.tareaDetTar
            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            fetchDataDetUsuTar();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
 
    useEffect(() => {
        fetchDataDetUsuTar();
    }, []);
 
    return { detalleUsuTar, fetchDataDetUsuTar, postHttp, updateState };
 };
 

export default useDataServiceDetUsuTar;