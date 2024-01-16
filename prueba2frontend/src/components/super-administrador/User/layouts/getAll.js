
import React, {useState}from 'react';
import Table from "../../../components-reutilizables/table/Table";
import useDataService from "../DataUSerService";
import AuthData from "../../../../api/Auth";
import Cookies from "js-cookie";
import {verifyToken} from "../../../../api/TokenDecode";

import Formulario from '../../../components-reutilizables/formulario/formulario';


const GetAll = () => {
  const { data, fetchData } = useDataService();
  const [titlee, settitlee] = useState('');



  const handleRefreshData = () => {
    // Llama a fetchData para actualizar los datos
    fetchData();
  };
    const { responseState } = AuthData();

    // ----------------------------------------------------------
    // MAEJO DE ROLES Y AUTENTIFICACION
    React.useEffect(() => {
        const authToken = Cookies.get('authToken');
        let rol = verifyToken(authToken).roles[0]
        if(rol !=="Super Administrador"){
            Cookies.remove('authToken');
            window.location.href = '/'
        }
        if (!Cookies.get('authToken')) {
            window.location.href = '/'
            Cookies.remove('authToken');
        }
        if (responseState.status === 403) {
            Cookies.remove('authToken');
            window.location.href = '/'
        }

    }, []);




  const abrirForm=(title)=>{
      settitlee(title);
  }

  console.log(data);

  const nameColumnsDisplay = ['ID Usuario', 'Correo Electrónico', 'Primer Nombre', 'Segundo Nombre', 'Primer Apellido', 'Segundo Apellido', 'Número de Documento', 'Teléfono', 'Estado Usuario', 'Rol', 'Tipo de Documento'];
  const nameColumnsKeys = ["idUsuario", "username", "primerNombre", "segundoNombre", "primerApellido", "segundoApellido", "numDocUsu", "telefono", "estadoUsu", "id_rolfk", "id_tipo_docfk"];

  return (
      <div>
        <Table title={"Usuarios"} nameColumnsK={nameColumnsKeys} nameColumnsD={nameColumnsDisplay} items={data} />

        <Formulario title={"Registrar DetalleServicio"}/>

        <button onClick={() => abrirForm("Registrar Proceso Compañia")}>Registrar Proceso Compañia</button>
        <button onClick={() => abrirForm("Registrar Usuario")}>Registrar Usuario</button>
        <button onClick={() => abrirForm("Registrar Documento")}>Registrar Documento</button>
        
        {titlee === "Registrar Proceso Compañia" ? (
          <>
          <Formulario title={titlee}/> 
          </>
        ): null}
        {titlee === "Registrar Usuario" ? (
          <>
          <Formulario title={titlee}/> 
          </>
        ): null}
        {titlee === "Registrar Documento" ? (
          <>
          <Formulario title={titlee}/> 
          </>
        ): null}
        


      </div>
  );
};

export default GetAll;
