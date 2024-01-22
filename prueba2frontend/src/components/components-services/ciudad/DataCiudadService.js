import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/ciudad';

const useDataServiceCiudad = () => {
    const [ciudad, setCiudad] = useState([]);
    const authToken = Cookies.get('authToken');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };
    const fetchDataCiudad = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });
 
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
 
            setCiudad(response.data);
        } catch (error) {
            console.error('Request failed:', error.message);
        }
    };
 
    useEffect(() => {
        fetchDataCiudad();
    }, []);
 
    return { ciudad, fetchDataCiudad };
 };
 

export default useDataServiceCiudad;