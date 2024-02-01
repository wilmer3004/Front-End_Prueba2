import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useDataServiceCompania from "../compañia/DataCompService";
import "./CargaDeDocumentos.css";

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

        // Validar que no haya archivos duplicados
        if (archivosDocumentos.length !== [...new Set(archivosDocumentos.map(file => file.name))].length) {
            setErrorData('Has añadido un archivo que ya ha sido añadido.');
            return;
        }

        for (let i = 0; i < archivosDocumentos.length; i++) {
            const formData = new FormData();
            formData.append("estadoDocumento", estadoDocumento);
            formData.append("archivoDocumento", archivosDocumentos[i]);
            formData.append("idCompaniaFK", idCompaniaFK);

            const response = await axios.post(apiUrl, formData, {headers});
            console.log(response.data);
            setDataBaseEncode(response.data.archivoDocumento)
        };
        handleRedirect("companias");
    };






    return(
        <div>
            <form onSubmit={handleSubmit}>
                {Array.from({length: numInputs}).map((_, index) => (
                    <div key={index}>
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
                                    setErrorData("¡No puedes borrar archivos si no hay!");
                                }
                            }}>X
                        </button>

                    </div>
                ))}
                {errorData !== "" ? (
                    <div>
                        <p>{errorData}</p>
                    </div>
                ) : null
                }

                <button onClick={(e) => {
                    e.preventDefault();
                    setNumInputs(numInputs + 1);
                    setErrorData("");
                }}>Añadir más documentos
                </button>


                <select value={idCompaniaFK} onChange={(e) => setIdCompaniaFK(e.target.value)}>
                    {compania.map(comp => (
                        comp.estadoCompania === true ? (
                            <option value={comp.idCompania} key={comp.idCompania}>
                                {comp.nombreCompania}
                            </option>
                        ) : null
                    ))}
                </select>

                <button type="submit">Cargar</button>

            </form>
            <br/>

    <br/>

</div>
)
    ;

};

export default CargaDeDocumentos;





