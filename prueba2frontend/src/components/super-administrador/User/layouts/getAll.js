
import React, {useState}from 'react';
import Table from "../../../components-reutilizables/table/Table";
import useDataService from "../DataUSerService";
import AuthData from "../../../../api/Auth";
import Cookies from "js-cookie";
import Swal from "sweetalert2"
import {verifyToken} from "../../../../api/TokenDecode";

import Formulario from '../../../components-reutilizables/formulario/formulario';


const GetAll = ({handleRedirect}) => {
  const { data, fetchData,updateState,postHttp } = useDataService();
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
        updateState(id);
        Swal.fire({
            title: `Se edito el estado`,
            text: `Se edito estado correctamte del usuario con id ${id} en la base de datos :D`,
            icon: "success"
        });
    }
    const handlePost=(data)=>{
        postHttp(data)
        settitlee('')
        Swal.fire({
            title: "Se registro correctamente",
            text: "Se registro correctamte el usuario en la base de datos :D",
            icon: "success"
        });
        handleRedirect("getalluser");
    }



  const abrirForm=(title)=>{
      settitlee(title);
  }



  const nameColumnsDisplay = ['ID Usuario', 'Correo Electrónico', 'Primer Nombre', 'Segundo Nombre', 'Primer Apellido', 'Segundo Apellido', 'Número de Documento', 'Teléfono', 'Estado Usuario', 'Rol', 'Tipo de Documento'];
  const nameColumnsKeys = ["idUsuario", "username", "primerNombre", "segundoNombre", "primerApellido", "segundoApellido", "numDocUsu", "telefono", "estadoUsu", "id_rolfk", "id_tipo_docfk"];

  return (
      <div>
            <Table title={"Usuarios"} nameColumnsK={nameColumnsKeys} nameColumnsD={nameColumnsDisplay} items={data} handleState={handleState} abrirForm={abrirForm} titleForm={"Registrar Usuario"}/>


        {titlee === "Registrar Usuario" ? (
          <>
              <Formulario title={titlee} setTitle={settitlee} handlePost={handlePost}/>
          </>
        ): null}

        


      </div>
  );
};

export default GetAll;
