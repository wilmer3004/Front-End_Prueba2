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
    const [documentosByID,setDocumentosByID] = useState([]);


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
    const postHttp = async (documento) => {
        try {
            const dataRequest = {
                "archivoDocumento": documento.document,
                "estadoDocumento": documento.estadoDocumento,
                "idCompaniaFK": documento.numCompaniaDoc
            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            fetchDataDocument();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
    const fetchDataByIDDoc = async (id) => {
        try {
            const response = await axios.get(`${apiURL}/${id}`, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            setDocumentosByID(response.data);
            return response.data;
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
 
    useEffect(() => {
        fetchDataDocument();
    }, []);
 
    return { documento, fetchDataDocument, postHttp, updateState,fetchDataByIDDoc,documentosByID };
 };
 

export default useDataServiceDocument;