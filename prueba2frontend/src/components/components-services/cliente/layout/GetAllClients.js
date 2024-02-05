
import React, {useEffect, useState} from 'react';
import Table from "../../../components-reutilizables/table/Table";
import AuthData from "../../../../api/Auth";
import './GetAllClient.css';
import Cookies from "js-cookie";
import Swal from "sweetalert2"
import {verifyToken} from "../../../../api/TokenDecode";

import Formulario from '../../../components-reutilizables/formulario/formulario';
import useDataServiceCliente from '../DataClientService';
import CargaMasiva from '../../cargaMasivaClientes/CargaMasivaClientes';
import {useDispatch, useSelector} from "react-redux";
import { changeEstado } from '../../../../redux/cargaMasiva';



const GetAllClients = ({handleRedirect}) => {
  const { clientes,updateState, postHttp, fetchDataByID } = useDataServiceCliente();
  const [titlee, settitlee] = useState('');
  const [dataEdit,setDataEdit]=useState({});
    const authToken = Cookies.get('authToken');
    let rol;
    if (authToken) {
        const decodedToken = verifyToken(authToken);
        if (decodedToken && decodedToken.roles) {
            rol = decodedToken.roles[0];
        }
    }


    const estadoCargaMasiva = useSelector(state => state.cargaMasiva);
    const dispatch = useDispatch();


    const { responseState } = AuthData();

    // ----------------------------------------------------------
    const checkRoleAndToken = () => {
        if(rol ==="Empleado"){
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
    };

    useEffect(() => {
        checkRoleAndToken();
        const intervalId = setInterval(checkRoleAndToken, 1000);
        return () => clearInterval(intervalId);
    }, []);


    //Servicios post y update
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
        handleRedirect("getallclientes");
    }

    const abrirForm = (titlee)=>{
        setDataEdit({
            idCliente: null,
            pNombreCli: "",
            sNombreCli: "",
            pApellidoCli: "",
            sApellidoCli: "",
            numDocCli: "",
            telefonoCli: "",
            usernameCli: "",
            estadoCli: "",
            ciudadCli: "",
            TipoDocCli: "",
        })
        settitlee(titlee);
        
        
        dispatch(changeEstado(titlee))
    };

    const handleFetchDataByID = async (id) => {

        const dataCli = await fetchDataByID(id);
        await setDataEdit({
            idCliente: dataCli.idCliente,
            pNombreCli: dataCli.pnombreCliente,
            sNombreCli: dataCli.snombreCliente,
            pApellidoCli: dataCli.papellidoCliente,
            sApellidoCli: dataCli.sapellidoCliente,
            numDocCli: dataCli.numIdentCliente,
            telefonoCli: dataCli.telefonoCliente,
            usernameCli: dataCli.correoCliente,
            estadoCli: dataCli.estadoCliente ? "1" : "0",
            ciudadCli: dataCli.idCiudadFK.idCiudad,
            TipoDocCli: dataCli.idTipoDocFK.idTipoDoc,
        });

        console.log(dataCli.idCiudadFK,dataCli.idTipoDocFK);

        settitlee("Registrar Cliente")
    }



  const nameColumnsDisplay = ['ID Usuario', 'Primero Nombre', 'Segundo Nombre', 'Primer Apellido', 'Segundo Apellido', 'Numero de Identificacion', 'Telefono', 'Correo Electronico', 'Estado Usuario', 'Ciudad', 'Tipo de Documento'];
  const nameColumnsKeys = ["idCliente", "pnombreCliente", "snombreCliente", "papellidoCliente", "sapellidoCliente", "numIdentCliente", "telefonoCliente", "correoCliente", "estadoCliente", "idCiudadFK", "idTipoDocFK"];

  return (
      <div>
            <Table title={"Clientes"} nameColumnsK={nameColumnsKeys} nameColumnsD={nameColumnsDisplay} items={clientes} handleState={handleState} abrirForm={abrirForm} titleForm={"Registrar Cliente"} handleFetchDataByID={handleFetchDataByID}/>


        {titlee === "Registrar Cliente" ? (
          <>
              <Formulario title={titlee} setTitle={settitlee} handlePost={handlePost} valuesDataR={dataEdit}/>
          </>
        ): null}
        {estadoCargaMasiva.estado === "Carga Masiva" ? (
          <>
              <CargaMasiva title={titlee}/>
          </>
        ): null}

        


      </div>
  );
};

export default GetAllClients;
