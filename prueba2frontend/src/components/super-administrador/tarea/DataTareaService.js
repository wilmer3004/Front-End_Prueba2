import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/tarea';
const authToken = Cookies.get('authToken');
const headers = {
    'Authorization': `Bearer ${authToken}`
};
const useDataServiceTarea = () => {
    const [tareas, setTareas] = useState([]);
 
    const fetchDataTarea = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });
 
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
 
            setTareas(response.data);
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
            fetchDataTarea();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
    const postHttp = async (tareas) => {
        try {
            const dataRequest = {
                "nombreTarea": tareas.nombreTarea,
                "descripcionTarea": tareas.descripcionTarea,
                "estadoTarea": tareas.estadoTarea,
            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            fetchDataTarea();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
 
 
    useEffect(() => {
        fetchDataTarea();
    }, []);
 
    return { tareas, fetchDataTarea, postHttp, updateState };
 };
 

export default useDataServiceTarea;
