import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/tipoDoc';
const authToken = Cookies.get('authToken');
const headers = {
    'Authorization': `Bearer ${authToken}`
};
const useDataServiceTipoDoc = () => {
    const [tipoDoc, setTipoDoc] = useState([]);
 
    const fetchDataTipoDoc = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });
 
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
 
            setTipoDoc(response.data);
        } catch (error) {
            console.error('Request failed:', error.message);
        }
    };
 
    useEffect(() => {
        fetchDataTipoDoc();
    }, []);
 
    return { tipoDoc, fetchDataTipoDoc };
 };
 

export default useDataServiceTipoDoc;
