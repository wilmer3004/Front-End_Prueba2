import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/compania';
const authToken = Cookies.get('authToken');
const headers = {
    'Authorization': `Bearer ${authToken}`
};
const useDataServiceCompania = () => {
    const [compania, setCompania] = useState([]);
 
    const fetchDataCompania = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });
 
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
 
            setCompania(response.data);
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
            fetchDataCompania();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
    const postHttp = async (compania) => {
        try {
            const dataRequest = {
                "nombreCompania": compania.nombreComp,
                "nitCompania": compania.NIT,
                "representanteLegalCompania": compania.nombreRepre,
                "estadoCompania": compania.estadoComp
            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            fetchDataCompania();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };

    useEffect(() => {
        fetchDataCompania();
    }, []);
 
    return { compania, fetchDataCompania, postHttp, updateState };
 };
 

export default useDataServiceCompania;