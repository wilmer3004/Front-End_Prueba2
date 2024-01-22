
import React, {useState}from 'react';
import Table from "../../../components-reutilizables/table/Table";
import useDataService from "../DataUSerService";
import AuthData from "../../../../api/Auth";
import './GetAll.css';
import Cookies from "js-cookie";
import Swal from "sweetalert2"
import {verifyToken} from "../../../../api/TokenDecode";

import Formulario from '../../../components-reutilizables/formulario/formulario';


const GetAll = ({handleRedirect}) => {
  const { data, fetchData,updateState,postHttp,fetchDataByID } = useDataService();
  const [titlee, settitlee] = useState('');
  const [dataEdit,setDataEdit]=useState({});


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
        try {
            handleRedirect("getalluser");
            fetchData();
        }catch (error){
            handleRedirect("getalluser");
            fetchData();
        }
    }



  const abrirForm=(title)=>{
      setDataEdit({
          idUser:null,
          pNombre:"",
          pApellido:"",
          numDoc:"",
          telefono:"",
          username:"",
          password:"",
          segundoNombre:"",
          segundoApellido:"",
          rol:"",
          estadoUsuario:"",
          tipoDocumento:"",
      });
      settitlee(title);
  }
    const handleFetchDataByID = async (id) => {

        const dataS = await fetchDataByID(id);
        console.log(dataS);
        await setDataEdit({
            idUser:dataS.idUsuario,
            pNombre:dataS.primerNombre,
            pApellido:dataS.primerApellido,
            numDoc:dataS.numDocUsu,
            telefono:dataS.telefono,
            username:dataS.username,
            password:"",
            segundoNombre:dataS.segundoNombre,
            segundoApellido:dataS.segundoApellido,
            rol:dataS.id_rolfk.idRol,
            estadoUsuario:dataS.estadoUsu? "1" : "0",
            tipoDocumento:dataS.id_tipo_docfk.idTipoDoc,
        });

        settitlee("Registrar Usuario")
    }


  const nameColumnsDisplay = ['ID Usuario', 'Correo Electrónico', 'Primer Nombre', 'Segundo Nombre', 'Primer Apellido', 'Segundo Apellido', 'Número de Documento', 'Teléfono', 'Estado Usuario', 'Rol', 'Tipo de Documento'];
  const nameColumnsKeys = ["idUsuario", "username", "primerNombre", "segundoNombre", "primerApellido", "segundoApellido", "numDocUsu", "telefono", "estadoUsu", "id_rolfk", "id_tipo_docfk"];

  return (
      <div>
            <Table title={"Usuarios"} nameColumnsK={nameColumnsKeys} nameColumnsD={nameColumnsDisplay} items={data} handleState={handleState} handleFetchDataByID={handleFetchDataByID} abrirForm={abrirForm} titleForm={"Registrar Usuario"}/>


        {titlee === "Registrar Usuario" ? (
          <>
              <Formulario title={titlee} setTitle={settitlee} handlePost={handlePost} valuesDataR={dataEdit}/>
          </>
        ): null}

        


      </div>
  );
};

export default GetAll;
