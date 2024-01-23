import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';
import useDataServiceDetSerCom from "../detalleServicioCompañia/DataDetSerCom";

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
    const fetchDataByIDSer = async (id) => {
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

    const{ postHttpDetSerCom} = useDataServiceDetSerCom();
    const postHttp = async (data) => {
        try {
            const dataRequest = {
                "idServicio":data.idSer,
                "nombreServicio": data.nombreSer,
                "valorServicio": data.precioSer,
                "estadoServicio": data.estadoSer,
            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            fetchData();
            var datosServicio= servicios;
            console.log(datosServicio)
            var servicio= datosServicio[datosServicio.length -1];

            console.log(servicio, datosServicio)

            const companyIds = data.companiasSeleccionadas.map(id => parseInt(id));
            
            console.log(companyIds)
            companyIds.map(detalleSerCom =>(
                postHttpDetSerCom(detalleSerCom, servicio.idServicio)
            ) )

            

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

    return { servicios, fetchData,updateState,postHttp,fetchDataByIDSer,serviciosByID };
};

export default useServicioDataService;
