import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';
import useDataServiceDocument from "../documento/DataDocumenService";

const apiURL = '/api/compania';

const useDataServiceCompania = () => {
    const [compania, setCompania] = useState([]);
    const [companiasByID,setCompaniasByID] = useState([]);

    const authToken = Cookies.get('authToken');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };
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
    const fetchDataByIDComp = async (id) => {
        try {
            const response = await axios.get(`${apiURL}/${id}`, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            setCompaniasByID(response.data);
            return response.data;
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
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

    const {documento,postHttpDocumento}=useDataServiceDocument();
    const postHttp = async (compania) => {
        try {
            const dataRequest = {
                "idCompania": compania.idCompania,
                "nombreCompania": compania.nombreComp,
                "nitCompania": compania.NIT,
                "representanteLegalCompania": compania.nombreRepre,
                "estadoCompania": compania.estadoComp
            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            fetchDataCompania();

            var datosCompania = compania;
            console.log(datosCompania);
            var compania = datosCompania[datosCompania.length -1];
            console.log(compania,datosCompania);
            const documentoIds = compania.documentosSeleccionados.map(id => parseInt(id));
            console.log(documentoIds);
            documentoIds.map(async documentoCompania => (
                await postHttpDocumento(documentoCompania, compania.idCompania)
            ))


            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            fetchDataCompania();
            return;

        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };

    useEffect(() => {
        fetchDataCompania();
    }, []);
 
    return { compania, fetchDataCompania, fetchDataByIDComp, postHttp, updateState,companiasByID  };
 };
 

export default useDataServiceCompania;