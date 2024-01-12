import axios from 'axios';
import Cookies from "js-cookie";
import React, { useState, useEffect } from 'react';
import Nav from "../../components-reutilizables/nav/Nav";
import Table from "../../components-reutilizables/table/Table";

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

  console.log(data)

  const dataNav = ["Inicio","Registrar"]
  const nameColumnsDisplay = ['ID Usuario', 'Correo Electrónico', 'Primer Nombre', 'Segundo Nombre', 'Primer Apellido', 'Segundo Apellido', 'Número de Documento', 'Teléfono', 'Estado Usuario', 'Rol', 'Tipo de Documento'];
  const nameColumnsKeys = ["idUsuario","username","primerNombre","segundoNombre","primerApellido","segundoApellido","numDocUsu","telefono","estadoUsu","id_rolfk","id_tipo_docfk"];

  return (
      <div>
        <Nav items={dataNav}/>
        <h1>Mis Datos</h1>
        <Table title={"Usuarios"} nameColumnsK={nameColumnsKeys} nameColumnsD={nameColumnsDisplay} items={data}/>
      </div>
  );
}

export default GetAll;
