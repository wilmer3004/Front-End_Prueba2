import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/servicio';
const authToken = Cookies.get('authToken');
const headers = {
    'Authorization': `Bearer ${authToken}`
};

const useServicioDataService = () => {
    const [data, setData] = useState([]);

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
                "nombreServicio": data.nombreSer,
                "valorServicio": data.precioSer,
                "estadoServicio": data.estadoSer,

            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            fetchData();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    return { data, fetchData,updateState,postHttp };
};

export default useServicioDataService;
