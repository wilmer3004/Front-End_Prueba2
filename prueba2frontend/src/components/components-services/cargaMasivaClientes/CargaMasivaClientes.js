import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useDataServiceCompania from "../compañia/DataCompService";
import "./CargaMasivaClientes.css";
import {verifyToken} from "../../../api/TokenDecode";
import AuthData from "../../../api/Auth";
import Swal from "sweetalert2";
import { changeEstado } from "../../../redux/cargaMasiva";
import {useDispatch, useSelector} from "react-redux";
import useDataServiceTipoDoc from "../tipoDocumento/DataTipoDocService";
import useDataServiceCiudad from "../ciudad/DataCiudadService";




const CargaMasiva= () =>{

    const apiUrl = "api/excel/upload";
    const authToken = Cookies.get('authToken');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };

    const estadoCargaMasiva = useSelector(state => state.cargaMasiva);
    const dispatch = useDispatch();

    const {tipoDoc}= useDataServiceTipoDoc();
    const {ciudad}=useDataServiceCiudad();

    const [archivo, setArchivo] = useState([]);
    const[errorData,setErrorData]=useState("");


    // Seguridad
    let rol;
    if (authToken) {
        const decodedToken = verifyToken(authToken);
        if (decodedToken && decodedToken.roles) {
            rol = decodedToken.roles[0];
        }
    }

    const { responseState } = AuthData();


    const checkRoleAndToken = () => {
        if(rol !=="Super Administrador" && rol !=="Administrador"){
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

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar que todos los archivos sean PDF
            const fileExtension = archivo[0].name.split('.').pop().toLowerCase();
            console.log(fileExtension);
            if (fileExtension !== 'csv') {
                setErrorData('Por favor, sube un archivo CSV.');
                return;
            }
            if (archivo.length < 1) {
                setErrorData('Debes seleccionar al menos un archivo.');
                return;
            }

            const formData= new FormData();
            formData.append("file", archivo[0]);
            console.log(archivo[0]);


            const response= await axios.post(apiUrl, formData, {headers})
            
            console.log(response)
            dispatch(changeEstado(""))
            Swal.fire({
                title: "Se registro correctamente",
                text: "Se registro correctamente la tarea en la base de datos :D",
                icon: "success"
            });

        };

    const cancelar = () => {
        dispatch(changeEstado(""))
        Swal.fire({
            title: "Se cancelo la acción",
            text: "Se cerro el formulario de creacion",
            icon: "error"
        });
    }


        return(
            <div>
            {estadoCargaMasiva.estado==="Carga Masiva"?(
                <div className={"container-upload-files"}>

                        <>
                        <form onSubmit={handleSubmit}>
                                <h1>Carga Masivaaa</h1>
                                <p>Recomendaciones:</p>
                                    <li>Las columnas deben tener los siguientes nombre: pNombreCliente(Primer nombre), sNombreCliente(Segundo Nombre opcional), pApellidoCliente(Primer Apellido), sApellidoCliente(Segundo Apellido optional), numDocCliente(Numero identificacion), telefonoCliente, correoCliente, estadoCliente(true-Activo false-Inactivo), idCiudadFK, idTipoDocFK </li>
                                    <div className="otros">

                                        <div className="ciudades">
                                            <li>En la columna de ciudades tiene que poner la id de la ciudad:</li>
                                            {ciudad.map(ciu =>(
                                                ciu.estadoCiudad===true?(
                                                    <li className="ciu">{ciu.idCiudad}-{ciu.nombreCiudad}</li>
                                                ):null
                                                ))}
                                        </div>
                                        <div className="tipDoc">
                                            <li>En la columna de tipoDocumento tiene que poner la id del documento:</li>
                                            {tipoDoc.map(tipDoc =>(
                                                tipDoc.estadoTipoDoc===true?(
                                                    <li className="tip">{tipDoc.idTipoDoc}-{tipDoc.nombreTipoDoc}</li>
                                                ):null
                                                ))}
                                        </div>

                                    </div>
                                <input type="file" name="file" accept=".csv" onChange={(e)=>{
                                    let file1 = e.target.files[0];
                                    setArchivo([...archivo, file1]);

                                    }}></input>
                            <button type="submit" className={"button-upload"}>Cargar</button>
                            {errorData !== "" ? (
                                <div className={"data-error"}>
                                    <p>{errorData}</p>
                                </div>
                            ) : null}
                            <button className="cancelar" type="button" onClick={cancelar}>Cancelar</button>
                        </form>
                        </>
                </div>
                ):null}
            </div>
        )

}


export default CargaMasiva;