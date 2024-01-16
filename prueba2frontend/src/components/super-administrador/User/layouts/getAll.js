import React,{ useState } from 'react';
import Nav from "../../../components-reutilizables/nav/Nav";
import Table from "../../../components-reutilizables/table/Table";
import useDataService from "../DataUSerService";
import Formulario from '../../../components-reutilizables/formulario/formulario';

const GetAll = () => {
  const { data, fetchData } = useDataService();
  const [titlee, settitlee] = useState('');

  const handleRefreshData = () => {
    // Llama a fetchData para actualizar los datos
    fetchData();
  };

  const abrirForm=(title)=>{
      settitlee(title);
  }

  console.log(data);

  const dataNav = [
      {item:"Inicio",path:""},
      {item:"Registrar",path:"registrar"}];
  const nameColumnsDisplay = ['ID Usuario', 'Correo Electrónico', 'Primer Nombre', 'Segundo Nombre', 'Primer Apellido', 'Segundo Apellido', 'Número de Documento', 'Teléfono', 'Estado Usuario', 'Rol', 'Tipo de Documento'];
  const nameColumnsKeys = ["idUsuario", "username", "primerNombre", "segundoNombre", "primerApellido", "segundoApellido", "numDocUsu", "telefono", "estadoUsu", "id_rolfk", "id_tipo_docfk"];

  return (
      <div>
        <Nav items={dataNav} />
        <h1>Mis Datos</h1>
        <button onClick={handleRefreshData}>Actualizar Datos</button>
        <Table title={"Usuarios"} nameColumnsK={nameColumnsKeys} nameColumnsD={nameColumnsDisplay} items={data} />
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
