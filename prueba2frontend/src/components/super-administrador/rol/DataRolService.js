import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/rol';
const authToken = Cookies.get('authToken');
const headers = {
    'Authorization': `Bearer ${authToken}`
};
const useDataServiceTipoRol = () => {
    const [tipoRol, setTipoRol] = useState([]);
 
    const fetchDataTipoRol = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });
 
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
 
            setTipoRol(response.data);
        } catch (error) {
            console.error('Request failed:', error.message);
        }
    };
 
    useEffect(() => {
        fetchDataTipoRol();
    }, []);
 
    return { tipoRol, fetchDataTipoRol };
 };
 

export default useDataServiceTipoRol;