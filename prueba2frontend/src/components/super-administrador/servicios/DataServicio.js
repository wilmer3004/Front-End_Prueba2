import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const apiURL = '/api/servicio';

const useServicioDataService = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const authToken = Cookies.get('authToken');
            const headers = {
                'Authorization': `Bearer ${authToken}`
            };

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


    useEffect(() => {
        fetchData();
    }, []);

    return { data, fetchData };
};

export default useServicioDataService;
