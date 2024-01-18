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
 
    useEffect(() => {
        fetchDataTarea();
    }, []);
 
    return { tareas, fetchDataTarea };
 };
 

export default useDataServiceTarea;
