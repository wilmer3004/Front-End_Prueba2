
import React, {useState}from 'react';
import Table from "../../../components-reutilizables/table/Table";
import useDataService from "../DataUSerService";
import AuthData from "../../../../api/Auth";
import Cookies from "js-cookie";
import {verifyToken} from "../../../../api/TokenDecode";

import Formulario from '../../../components-reutilizables/formulario/formulario';


const GetAll = () => {
  const { data, fetchData,updateState } = useDataService();
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
    const handleState=(id)=>{
        updateState(id)
    }



  const abrirForm=(title)=>{
      settitlee(title);
  }



  const nameColumnsDisplay = ['ID Usuario', 'Correo Electrónico', 'Primer Nombre', 'Segundo Nombre', 'Primer Apellido', 'Segundo Apellido', 'Número de Documento', 'Teléfono', 'Estado Usuario', 'Rol', 'Tipo de Documento'];
  const nameColumnsKeys = ["idUsuario", "username", "primerNombre", "segundoNombre", "primerApellido", "segundoApellido", "numDocUsu", "telefono", "estadoUsu", "id_rolfk", "id_tipo_docfk"];

  return (
      <div>
        <Table title={"Usuarios"} nameColumnsK={nameColumnsKeys} nameColumnsD={nameColumnsDisplay} items={data} handleState={handleState}/>


        {/*<button onClick={() => abrirForm("Registrar Proceso Compañia")}>Registrar Proceso Compañia</button>*/}
        <button onClick={() => abrirForm("Registrar Usuario")}>Registrar Usuario</button>
        {/*<button onClick={() => abrirForm("Registrar Documento")}>Registrar Documento</button>*/}
        <button onClick={() => abrirForm("Registrar Documento")}>Registrar Documento</button>
        <button onClick={() => abrirForm("Registrar Accion")}>Registrar Accion</button>
        <button onClick={() => abrirForm("Registrar Cliente")}>Registrar Cliente</button>
        <button onClick={() => abrirForm("Registrar DetalleServicio")}>Registrar DetalleServicio</button>
        <button onClick={() => abrirForm("Registrar DetalleTarea")}>Registrar DetalleTarea</button>
        <button onClick={() => abrirForm("Registrar Compañia")}>Registrar Compañia</button>
        <button onClick={() => abrirForm("Registrar Proceso Cliente")}>Registrar Proceso Cliente</button>
        <button onClick={() => abrirForm("Registrar Proceso Compañia")}>Registrar Proceso Compañia</button>
        <button onClick={() => abrirForm("Registrar Servicio")}>Registrar Servicio</button>
        
        {titlee === "Registrar Proceso Compañia" ? (
          <>
              <Formulario title={titlee} setTitle={settitlee} />
          </>
        ): null}
        {titlee === "Registrar Usuario" ? (
          <>
              <Formulario title={titlee} setTitle={settitlee} />
          </>
        ): null}
        {titlee === "Registrar Documento" ? (
          <>
              <Formulario title={titlee} setTitle={settitlee} />
          </>
        ): null}
        {titlee === "Registrar Accion" ? (
          <>
              <Formulario title={titlee} setTitle={settitlee} />
          </>
        ): null}
        {titlee === "Registrar Cliente" ? (
          <>
              <Formulario title={titlee} setTitle={settitlee} />
          </>
        ): null}
        {titlee === "Registrar DetalleServicio" ? (
          <>
              <Formulario title={titlee} setTitle={settitlee} />
          </>
        ): null}
        {titlee === "Registrar DetalleTarea" ? (
          <>
              <Formulario title={titlee} setTitle={settitlee} />
          </>
        ): null}
        {titlee === "Registrar Compañia" ? (
          <>
              <Formulario title={titlee} setTitle={settitlee} />
          </>
        ): null}
        {titlee === "Registrar Servicio" ? (
          <>
              <Formulario title={titlee} setTitle={settitlee} />
          </>
        ): null}{titlee === "Registrar Proceso Cliente" ? (
          <>
              <Formulario title={titlee} setTitle={settitlee} />
          </>
        ): null}{titlee === "Registrar Proceso Compañia" ? (
          <>
              <Formulario title={titlee} setTitle={settitlee} />
          </>
        ): null}
        


      </div>
  );
};

export default GetAll;
