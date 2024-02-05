import Table from "../../../components-reutilizables/table/Table";
import useDataServiceCompania from "../DataCompService";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
import React, { useState,useEffect } from "react";
import Cookies from "js-cookie";
import {verifyToken} from "../../../../api/TokenDecode";
import Formulario from "../../../components-reutilizables/formulario/formulario";
import AuthData from "../../../../api/Auth";
import Modal from "../../../components-reutilizables/modal/modal";
import {changeModal, changeEstadoModal} from "../../../../redux/modalSlice";


const CompaniaPage = ({handleRedirect})=>{

    const modal = useSelector(state => state.modal);
    const dispatch = useDispatch();


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
        const dataComp= {
            idCompania: null,
            nombreComp: data.nombreComp,
            nombreRepre: data.nombreRepre,
            NIT: data.NIT,
            estadoComp: data.estadoComp
        }
        dispatch(changeModal(dataComp))
        dispatch(changeEstadoModal("AsignarDocumentos"))
    }


    const abrirForm=(titlee)=>{
        setDataEdit({
            idCompania: null,
            nombreComp: "",
            NIT: "",
            nombreRepre: "",
            estadoComp: ""
        });
        dispatch(changeEstadoModal(titlee))
    }
    const handleFetchDataByID= async (id)=>{
        const dataC= await fetchDataByIDComp(id);
        console.log(id)
        const data={
            idCompania: dataC.idCompania,
            nombreComp: dataC.nombreCompania,
            nombreRepre: dataC.representanteLegalCompania,
            NIT: dataC.nitCompania,
            estadoComp: dataC.estadoCompania
        }
        dispatch(changeModal(data))
        dispatch(changeEstadoModal("Actualizar Compania existente"))
        console.log( dataC, "aaaaaaaaaaaaaaaaaaa", data)
    }



    return(
        <div>
            <Table title={"Compañias"} nameColumnsD={nameColumnsDisplay} nameColumnsK={nameColumnsKeys} items={compania} handleState={handleState} handleFetchDataByID={handleFetchDataByID} abrirForm={abrirForm} titleForm={"Registrar Compania"} handleRedirect={handleRedirect}/>


            {modal.estadoModal==="Registrar Compania" ? (
                <Modal title={modal.estadoModal} handlePost={handlePost}/>
            ):null}
            
            {modal.estadoModal==="AsignarDocumentos" ? (
                <Modal title={modal.estadoModal} handlePost={handlePost}/>
            ):null}
            {modal.estadoModal==="Actualizar Companiaa"? (
                <Modal title={modal.estadoModal} handlePost={handlePost}/>
            ):null}
            {modal.estadoModal=== "Actualizar Compania existente" ? (
                 <Modal title={modal.estadoModal} handlePost={handlePost}/>
            ): null}
            
        </div>
    )


};

export default CompaniaPage;