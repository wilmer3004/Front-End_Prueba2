import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/servicio';

const useServicioDataService = () => {
    const authToken = Cookies.get('authToken');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };

    const [servicios, setData] = useState([]);
    const [serviciosByID,setServiciosByID] = useState([]);



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
    const fetchDataByID = async (id) => {
        try {
            const response = await axios.get(`${apiURL}/${id}`, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            setServiciosByID(response.data);
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
            fetchData();
            return;
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };

    const postHttp = async (data) => {
        try {
            const dataRequest = {
                "idServicio":data.idSer,
                "nombreServicio": data.nombreSer,
                "valorServicio": data.precioSer,
                "estadoServicio": data.estadoSer,

            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            fetchData();
            return;

        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };




    useEffect(() => {
        fetchData();
    }, []);

    return { servicios, fetchData,updateState,postHttp,fetchDataByID,serviciosByID };
};

export default useServicioDataService;
