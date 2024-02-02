import Table from "../../../components-reutilizables/table/Table";
import useDataServiceTarea from "../DataTareaService";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import AuthData from "../../../../api/Auth";
import React, {useState, useEffect} from "react";
import {verifyToken} from "../../../../api/TokenDecode";
import Formulario from "../../../components-reutilizables/formulario/formulario";


const TareasPage= ({handleRedirect})=>{
    const {tareas, postHttp, updateState, fetchDataByIDTar }= useDataServiceTarea();
    const [titlee, setTitlee] = useState('');
    const [dataEdit, setDataEdit] = useState({});
    const authToken = Cookies.get('authToken');
    let rol;
    if (authToken) {
        const decodedToken = verifyToken(authToken);
        if (decodedToken && decodedToken.roles) {
            rol = decodedToken.roles[0];
        }
    }

    const { responseState } = AuthData();
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
    const handleState= async (id) =>{
        await updateState(id);
        Swal.fire({
            title: `Se edito el estado`,
            text: `Se edito el estado correctamente la tarea con id ${id} en la base de datos :D`,
            icon: "success"
        });
    }

    const nameColumnsDisplay= ["ID Tarea","Nombre Tarea", "Descripcion Tarea", "Estado Tarea"];
    const nameColumnsKeys= ["idTarea","nombreTarea","descripcionTarea","estadoTarea"];


    const handlePost=(data)=>{
        postHttp(data)
        setTitlee('')
        Swal.fire({
            title: "Se registro correctamente",
            text: "Se registro correctamte la tarea en la base de datos :D",
            icon: "success"
        });
        handleRedirect("tareas");
    }

    const abrirForm= (titlee)=>{
        setDataEdit({
            idTarea: null,
            descripcionTarea:"", 
            nombreTarea: "",
            estadoTarea: ""
        });
        setTitlee(titlee);
    }

    const handleFetchDataByID=async (id)=>{

        const dataTar= await fetchDataByIDTar(id);
        await setDataEdit({
            idTarea: dataTar.idTarea,
            descripcionTarea: dataTar.descripcionTarea, 
            nombreTarea: dataTar.nombreTarea,
            estadoTarea: dataTar.estadoTarea ? "1":"0"
        })

        setTitlee("Registrar Tarea")
    }


    return(
        <div>
            <Table title={"Tareas"} nameColumnsD={nameColumnsDisplay} nameColumnsK={nameColumnsKeys} items={tareas} handleState={handleState} handleFetchDataByID={handleFetchDataByID} abrirForm={abrirForm} titleForm={"Registrar Tarea"}/>
        
            {titlee=== "Registrar Tarea" ? (
                <>
                    <Formulario title={titlee} setTitle={setTitlee} handlePost={handlePost} valuesDataR={dataEdit}/>
                </>
            ): null}
        
        </div>
    )
}

export default TareasPage