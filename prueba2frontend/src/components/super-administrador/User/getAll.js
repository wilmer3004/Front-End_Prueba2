import axios from 'axios';
import Cookies from "js-cookie";
import React, { useState, useEffect } from 'react';

const apiURL = '/api/user';

const GetAll = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleGetAll = async () => {
      try {
        const authToken = Cookies.get('authToken');
        const headers = {
          'Authorization': `Bearer ${authToken}`
        };

        if (authToken) {
          headers.Authorization = `Bearer ${authToken}`;
        }

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

    handleGetAll();
  }, []); // Ejecuta la función al montar el componente

  return (
      <div>
        <h1>Mis Datos</h1>
        <ul>
          {data.map(item => (
              <li key={item.idUsuario}>{item.primerNombre} - {item.primerApellido}- {item.id_tipo_docfk.nombreTipoDoc}-{item.username}-</li>
          ))}
        </ul>
      </div>
  );
}

export default GetAll;
