import axios from "../../api/Api";
import Cookies from "js-cookie";
import React, { useState, useEffect } from 'react';

const apiURL = '/api/user';

const GetAll = () => {
  const [data, setData] = useState([]);

  axios.interceptors.request.use(config => {
    const authToken = Cookies.get('authToken');

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  });

  useEffect(() => {
    const handleGetAll = async () => {
      try {
        const response = await axios.get(apiURL);
        setData(response.data);
        console.log(
            response.data
        );
      } catch (error) {
        console.error('Request failed:', error.response ? error.response.data : error.message);
        throw error;
      }
    };

    handleGetAll();
  }, []); // Ejecuta la función al montar el componente

  return (
    <div>
      <h1>Mis Datos</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.nombre} - {item.otroCampo}</li>
        ))}
      </ul>
    </div>
  );
}

export default GetAll;