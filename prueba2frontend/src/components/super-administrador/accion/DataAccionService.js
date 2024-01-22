import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/accion';

const useDataServiceAccion = () => {
    const [accion, setAccion] = useState([]);
    const authToken = Cookies.get('authToken');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };

    const fetchDataAccion = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });
 
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
 
            setAccion(response.data);
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
            fetchDataAccion();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
    const postHttp = async (data) => {
        try {
            const dataRequest = {
                "nombreAccion": data.username,
                "estadoAccion": data.password
            };
            const response = await axios.post("auth/register", dataRequest, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            fetchDataAccion();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };

 
    useEffect(() => {
        fetchDataAccion();
    }, []);
 
    return { accion, fetchDataAccion, postHttp, updateState };
 };
 

export default useDataServiceAccion;