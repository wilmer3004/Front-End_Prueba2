import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useDataServiceCompania from "../compañia/DataCompService";
import "./CargaDeDocumentos.css";
import {verifyToken} from "../../../api/TokenDecode";
import AuthData from "../../../api/Auth";
import Swal from "sweetalert2";
import {changeModal, changeEstadoModal} from "../../../redux/modalSlice";
import {useDispatch, useSelector} from "react-redux";



const CargaDeDocumentos = ({handleRedirect})=>{

    const apiUrl = "api/documento";
    const authToken = Cookies.get('authToken');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };
    const {compania,fetchDataCompania}=useDataServiceCompania();

    const [estadoDocumento, setEstadoDocumento] = useState(true);
    const [archivosDocumentos, setArchivosDocumentos] = useState([]);
    const [idCompaniaFK, setIdCompaniaFK] = useState(1);
    const [dataBaseEncode, setDataBaseEncode] = useState("");
    const [numInputs, setNumInputs] = useState(1);
    const[errorData,setErrorData]=useState("");

    const modal = useSelector(state => state.modal);
    const dispatch = useDispatch();


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


    useEffect(() => {
        fetchDataCompania();
    }, []);

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        setArchivosDocumentos([...archivosDocumentos, file]);
    };





    const handleSubmit = async (e) => {
        e.preventDefault();


        if (archivosDocumentos.length < 1) {
            setErrorData('Debes seleccionar al menos un archivo.');
            return;
        }
        if (!idCompaniaFK || idCompaniaFK <= 0) {
            setErrorData('Debes seleccionar un ID de compañía.');
            return;
        }

        // Validar que todos los archivos sean PDF
        for (let i = 0; i < archivosDocumentos.length; i++) {
            const fileExtension = archivosDocumentos[i].name.split('.').pop().toLowerCase();
            if (fileExtension !== 'pdf') {
                setErrorData('Por favor, sube un archivo PDF.');
                return;
            }
        }
        for (let i = 0; i < archivosDocumentos.length; i++) {
            // Validar que no haya archivos duplicados
            if (archivosDocumentos.length !== [...new Set(archivosDocumentos.map(file => file.name))].length) {
                setErrorData('Has añadido un archivo que ya ha sido añadido.');
                return;
            }
        }


        for (let i = 0; i < archivosDocumentos.length; i++) {
            const formData = new FormData();
            formData.append("estadoDocumento", estadoDocumento);
            formData.append("archivoDocumento", archivosDocumentos[i]);
            formData.append("idCompaniaFK", idCompaniaFK);

            const response = await axios.post(apiUrl, formData, {headers});
            setDataBaseEncode(response.data.archivoDocumento)
        };
        Swal.fire({
            title: "Se registro correctamente",
            text: "Se registro correctamte la tarea en la base de datos :D",
            icon: "success"
        });

        dispatch(changeEstadoModal(""))
    };






    return(
        <div className={"container-upload-files"}>
            <form onSubmit={handleSubmit}>
                <h1>Subir Archivos</h1>
                <div className={"scrollable"}>
                    {Array.from({length: numInputs}).map((_, index) => (
                        <div key={index} className={"data-file "}>
                            <input type={"file"} name={"file"} accept=".pdf" onChange={(e) => handleFileChange(e, index)}/>

                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (numInputs > 1) {
                                        const newFiles = [...archivosDocumentos];
                                        newFiles.splice(index, 1);
                                        setArchivosDocumentos(newFiles);
                                        setNumInputs(numInputs - 1);
                                        setErrorData("");
                                    } else {
                                        const newFiles = [...archivosDocumentos];
                                        newFiles.splice(index, 1);
                                        setArchivosDocumentos(newFiles);
                                        setNumInputs(numInputs - 1);
                                        setErrorData("");
                                        setErrorData("¡No puedes borrar archivos si no hay!");
                                    }
                                }}>X
                            </button>

                        </div>
                    ))}

                    <button onClick={(e) => {
                        e.preventDefault();
                        setNumInputs(numInputs + 1);
                        setErrorData("");
                    }}
                    className={"button-add"}
                    >Añadir más documentos
                    </button>
                </div>
                <label>
                    Compañia:
                    <select value={idCompaniaFK} onChange={(e) => setIdCompaniaFK(e.target.value)}>
                        {compania.map(comp => (
                            comp.estadoCompania === true ? (
                                <option value={comp.idCompania} key={comp.idCompania}>
                                    {comp.nombreCompania}
                                </option>
                            ) : null
                        ))}
                    </select>

                </label>

                <button type="submit" className={"button-upload"}>Cargar</button>
                {errorData !== "" ? (
                    <div className={"data-error"}>
                        <p>{errorData}</p>
                    </div>
                ) : null
                }
            </form>
            <br/>

    <br/>

</div>
)
    ;

};

export default CargaDeDocumentos;





