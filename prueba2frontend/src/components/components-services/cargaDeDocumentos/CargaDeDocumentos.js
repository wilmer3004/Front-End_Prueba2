import React, {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CargaDeDocumentos = ()=>{

    const apiUrl = "api/documento";
    const authToken = Cookies.get('authToken');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };

    const [estadoDocumento, setEstadoDocumento] = useState(true);
    const [archivoDocumento, setArchivoDocumento] = useState(null);
    const [idCompaniaFK, setIdCompaniaFK] = useState(1);
    const [dataBaseEncode, setDataBaseEncode] = useState("");

    const handleFileChange = (e) => {
        setArchivoDocumento(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("estadoDocumento", estadoDocumento);
        formData.append("archivoDocumento", archivoDocumento);
        formData.append("idCompaniaFK", idCompaniaFK);

        const response = await axios.post(apiUrl, formData, {headers});
        console.log(response.data);
        setDataBaseEncode(response.data.archivoDocumento)
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type={"checkbox"} checked={estadoDocumento}
                       onChange={(e) => setEstadoDocumento(e.target.checked)}/>
                <input type={"file"} name={"file"} onChange={handleFileChange}/>
                <input type={"number"} value={idCompaniaFK} onChange={(e) => setIdCompaniaFK(e.target.value)}/>
                <button type="submit">Cargar</button>

            </form>
            {dataBaseEncode? (
                <iframe src={`data:application/pdf;base64,${dataBaseEncode}`} width="100%" height="500px"/>
            ):null}

        </div>
    );

};

export default CargaDeDocumentos;





