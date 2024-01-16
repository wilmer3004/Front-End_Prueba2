import React from 'react';
import Nav from "../../../components-reutilizables/nav/Nav";
import Table from "../../../components-reutilizables/table/Table";
import useDataService from "../DataUSerService";

const GetAll = () => {
  const { data, fetchData } = useDataService();

  const handleRefreshData = () => {
    // Llama a fetchData para actualizar los datos
    fetchData();
  };

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
      </div>
  );
};

export default GetAll;
