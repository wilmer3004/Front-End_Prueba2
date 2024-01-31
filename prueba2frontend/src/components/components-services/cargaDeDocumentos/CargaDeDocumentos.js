import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useDataServiceCompania from "../compañia/DataCompService";

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
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();

        if (fileExtension !== 'pdf') {
            alert('Por favor, sube un archivo PDF.');
            return;
        }

        const newFiles = {...archivosDocumentos};
        newFiles[index] = file;
        setArchivosDocumentos(newFiles);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const keys = Object.keys(archivosDocumentos);
        for (let i = 0; i < keys.length; i++) {
            const formData = new FormData();
            formData.append("estadoDocumento", estadoDocumento);
            formData.append("archivoDocumento", archivosDocumentos[keys[i]]);
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
                                numInputs >= 1 ? setNumInputs(numInputs - 1) : setErrorData("¡No puedes borrar archivos si no hay!");
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
            {/*        {*/}
            {/*            dataBaseEncode ? (*/}
            {/*                <iframe src={`data:application/pdf;base64,${dataBaseEncode}`} width="100%" height="500px"/>*/}
    {/*            ) : null*/}
    {/*}*/}
    <br/>

</div>
)
    ;

};

export default CargaDeDocumentos;





