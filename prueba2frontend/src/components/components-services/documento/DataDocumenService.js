import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/documento';

const useDataServiceDocument = () => {
    const [documento, setDocumento] = useState([]);
    const authToken = Cookies.get('authToken');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };

    const fetchDataDocument = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });
 
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
 
            setDocumento(response.data);
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
            fetchDataDocument();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
    const postHttpDocumento = async (archivoDocumento,idCompaniaFK) => {
        try {
                const formData = new FormData();
                formData.append("estadoDocumento", true);
                formData.append("archivoDocumento", archivoDocumento);
                formData.append("idCompaniaFK", idCompaniaFK);

            const response = await axios.post(apiURL, formData, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            fetchDataDocument();
            return response;
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
 
    useEffect(() => {
        fetchDataDocument();
    }, []);
 
    return { documento, fetchDataDocument, postHttpDocumento, updateState };
 };
 

export default useDataServiceDocument;