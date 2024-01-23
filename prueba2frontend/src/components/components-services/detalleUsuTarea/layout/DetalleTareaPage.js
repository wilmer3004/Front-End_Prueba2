import Table from "../../../components-reutilizables/table/Table";
import useDataServiceDetUsuTar from "../DataDetUsuTarService";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import AuthData from "../../../../api/Auth";
import React, {useState, useEffect} from "react";
import { verifyToken } from "../../../../api/TokenDecode";
import Formulario from "../../../components-reutilizables/formulario/formulario";

const DetalleTarea= ({handleRedirect})=>{
    const { detalleUsuTar, fetchDataByID, postHttp, updateState }= useDataServiceDetUsuTar();
    const [titlee, setTitle]= useState();
    const [dataEdit, setDataEdit] = useState({});
    const authToken= Cookies.get('aithToken');
    let rol;
    if(authToken){
        const decodedToken= verifyToken(authToken);
        if(decodedToken && decodedToken.roles){
            rol= decodedToken.roles[0];
        }
    }

    const {responseState} = AuthData();
    const checkRoleAndToken= ()=>{
        if(rol==="Empleado"){
            Cookies.remove('authToken');
            window.location.href= '/';
        }
        if(!Cookies.get('authToken')) {
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
    const handleState= async(id)=>{
        await updateState(id);
        Swal.fire({
            title: `Se edito el estado`,
            text: `Se edito el estado correctamente la tarea con id ${id} en la base de datos :D`,
            icon: "success"
        });
    }

    const nameColumnsDisplay= ["ID Detalle Tarea", "Fecha Asignacion", "Fecha Fin", "Estado Detalle Tarea", "Empleado", "Tarea" ];
    const nameColumnsKeys=["idDetalleUsuTarea", "fechaAsigTarea", "fechaFinTarea", "estadoDetalleUsuTarea", "idUsuEmpleadoFK", "idTareaFK"];

    const handlePost=(data)=>{
        postHttp(data);
        setTitle('');
        Swal.fire({
            title: "Se registro correctamente",
            text: "Se registro correctamente el detalle de la tarea en la base de datos :D",
            icon: "success"
        });
        handleRedirect("detalleTar");
    }

    const abrirForm= (titlee)=>{
        setDataEdit({
            idDetalleTar: null,
            fechaAsigDetTa: "",
            fechaFinDetTa: "",
            estadoDetTar:"",
            empleadoDetTarea:"",
            tareaDetTar:""
        });
        setTitle(titlee);
    };

    const handleFetchDataByID= async(id)=>{
        const dataDetTare= await fetchDataByID(id)
        await setDataEdit({
            idDetalleTar: dataDetTare.idDetalleUsuTarea,
            fechaAsigDetTa: dataDetTare.fechaAsigTarea,
            fechaFinDetTa: dataDetTare.fechaFinTarea,
            estadoDetTar: dataDetTare.estadoDetalleUsuTarea ? "1" : "0",
            empleadoDetTarea: dataDetTare.idUsuEmpleadoFK,
            tareaDetTar: dataDetTare.idTareaFK
        });

        setTitle("Registrar DetalleTarea")
    }

    return(
        <div>
            <Table title={"Detalles Tareas"} nameColumnsD={nameColumnsDisplay} nameColumnsK={nameColumnsKeys} items={detalleUsuTar} handleState={handleState} handleFetchDataByID={handleFetchDataByID} abrirForm={abrirForm} titleForm={"Registrar DetalleTarea"}/>
            
            
            {titlee==="Registrar DetalleTarea"?(
                <>
                    <Formulario title={titlee} setTitle={setTitle} handlePost={handlePost} valuesDataR={dataEdit}/>
                </>
            ):null}
        </div>

    )

}

export default DetalleTarea;