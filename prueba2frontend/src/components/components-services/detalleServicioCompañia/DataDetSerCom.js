import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';
import useDataServiceCompania from "../compañia/DataCompService";
import useDataService from "../User/DataUSerService";
import Swal from "sweetalert2"


const apiURL = '/api/detalleSerCom';

const useDataServiceDetSerCom = () => {
    const [detalleSerCom, setDetalleSerCom] = useState([]);
    const authToken = Cookies.get('authToken');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };

    const fetchDataDetSerCom = async () => { 
        try {
            const response = await axios.get(apiURL, { headers });
 
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
 
            setDetalleSerCom(response.data);
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

            setDetalleSerCom(response.data);
            return response.data;
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };

    const{ fetchDataByIDComp } = useDataServiceCompania();

    const postHttpDetSerCom = async (idCompania, idServicio) => {
        try {
            const dataRequest = {
                "idCompaniaFK": idCompania,
                "idServicioFK": idServicio
            };
            const response = await axios.post(apiURL, dataRequest, { headers });

            if(response.status===409){
                var compania=fetchDataByIDComp(idCompania);

                Swal.fire({
                    title: `Error`,
                    text: `${response.message}: ${compania.nombreCompania}`,
                    icon: "error"
                });
                return;
            }

            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            console.log("Se registro correctamente", response, dataRequest)
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    };
 
    useEffect(() => {
        fetchDataDetSerCom();
    }, []);
 
    return { detalleSerCom, fetchDataDetSerCom, postHttpDetSerCom };
 };
 

export default useDataServiceDetSerCom;