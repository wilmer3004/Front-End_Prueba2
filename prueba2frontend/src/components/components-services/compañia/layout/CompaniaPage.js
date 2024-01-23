import Table from "../../../components-reutilizables/table/Table";
import useDataServiceCompania from "../DataCompService";
import Swal from "sweetalert2";
import React, { useState,useEffect } from "react";
import Cookies from "js-cookie";
import {verifyToken} from "../../../../api/TokenDecode";
import Formulario from "../../../components-reutilizables/formulario/formulario";
import AuthData from "../../../../api/Auth";


const CompaniaPage = ({handleRedirect})=>{
    const { compania, fetchDataByIDComp, postHttp, updateState  } = useDataServiceCompania();
    const [ titlee, setTitlee ]= useState();
    const [ dataEdit, setDataEdit ]= useState();
    const authToken = Cookies.get('authToken');
    let rol;
    if (authToken) {
        const decodedToken = verifyToken(authToken);
        if (decodedToken && decodedToken.roles) {
            rol = decodedToken.roles[0];
        }
    }

    const { responseState } = AuthData();

    // ----------------------------------------------------------
    const checkRoleAndToken = () => {
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
    };

    useEffect(() => {
        checkRoleAndToken();
        const intervalId = setInterval(checkRoleAndToken, 1000);
        return () => clearInterval(intervalId);
    }, []);



    const handleState= async (id) =>{
        await updateState(id);
        Swal.fire({
            title: `Se edito el estado`,
            text: `Se edito estado correctamente de la compania con id ${id} en la base de datos :D`,
            icon: "success"
        });
    }

    const nameColumnsDisplay=["ID Compañia", "Nombre Compañia", "NIT", "Representante Legal", "Estado Compañia"];
    const nameColumnsKeys= ["idCompania","nombreCompania","nitCompania","representanteLegalCompania","estadoCompania"];

    const handlePost= async(data)=>{
        await postHttp(data);
        Swal.fire({
            title: "Se registro correctamente",
            text: "Se registro correctamente la compañia en la base de datos :D",
            icon: "success"
        });

        handleRedirect("companias");
    }

    const abrirForm=(titlee)=>{
        setDataEdit({
            idCompania: null,
            nombreComp: "",
            NIT: "",
            nombreRepre: "",
            estadoComp: ""
        });
        setTitlee(titlee);
    }
    const handleFetchDataByID= async (id)=>{
        const dataC= await fetchDataByIDComp(id);
        await setDataEdit({
            idCompania: dataC.idCompania,
            nombreComp: dataC.nombreCompania,
            NIT: dataC.nitCompania,
            nombreRepre: dataC.representanteLegalCompania,
            estadoComp: dataC.estadoCompania
        })

        setTitlee("Registrar Compania")
    }


    return(
        <div>
            <Table title={"Companias"} nameColumnsD={nameColumnsDisplay} nameColumnsK={nameColumnsKeys} items={compania} handleState={handleState} handleFetchDataByID={handleFetchDataByID} abrirForm={abrirForm} titleForm={"Registrar Compania"}/>

            {titlee==="Registrar Compania" ? (
                <>
                    <Formulario title={titlee} setTitle={setTitlee} handlePost={handlePost} valuesDataR={dataEdit}/>
                </>
            ): null}
        </div>
    )


};

export default CompaniaPage;