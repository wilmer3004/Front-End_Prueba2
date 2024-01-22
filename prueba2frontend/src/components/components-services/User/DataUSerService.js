import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/user';
const useDataService = () => {
    const authToken = Cookies.get('authToken');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };
    const [data, setData] = useState([]);
    const [UserByID,setUserByID] = useState([]);

    const fetchData = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            setData(response.data);
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
            fetchData();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
    const postHttp = async (data) => {
        try {
            const dataRequest = {
                "idUsuario":data.idUser,
                "username": data.username,
                "password": data.password,
                "primerNombre": data.pNombre,
                "segundoNombre": data.segundoNombre,
                "primerApellido": data.pApellido,
                "segundoApellido": data.segundoApellido,
                "numDocUsu": data.numDoc,
                "telefono": data.telefono,
                "estadoUsu": data.estadoUsuario,
                "id_rolfk": data.rol,
                "id_tipo_docfk": data.tipoDocumento
            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            fetchData();
        } catch (error) {
            console.error('Request failed:', error.message);
        }
    };
    const fetchDataByID = async (id) => {
        try {
            const response = await axios.get(`${apiURL}/${id}`, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            setUserByID(response.data);
            return response.data;
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    return { data, fetchData,updateState,postHttp,fetchDataByID };
};

export default useDataService;
